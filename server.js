import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import Recipe from './models/RecipeModel.ts';
import User  from './models/UserModel.ts';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Session middleware
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport-local strategy for login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Compare password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);  // User found and password matched
  } catch (err) {
    return done(err);
  }
}));

// Passport session serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);  // Save user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);  // Fetch user by ID
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const protect = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;  // Attach the decoded user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminProtect = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization')?.split(' ')[1];

  if (!token.length) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/api/users/register', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,

    });

    // Save user to the database
    const savedUser = await newUser.save();
    req.login(savedUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in user after registration' });
      }

      // Send response after successful registration and login
      res.status(201).json({ message: 'Registration successful and user logged in', user: savedUser });
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// // User Login Route (Passport will authenticate)
// app.post('/api/users/login', passport.authenticate('local', {
//   successRedirect: '/api/protected',  // Redirect after successful login
//   failureRedirect: '/api/users/login/fail',  // Redirect after failed login
// }));

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email }).populate('favorites');;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token, user, favorites: user.favorites });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to log in user' });
  }
});

// Login failure route
app.get('/api/users/login/fail', (req, res) => {
  res.status(400).json({ message: 'Invalid credentials' });
});

// Protected Route
app.get('/api/protected', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ message: 'This is a protected route', user: req.user });
});

// Logout Route
app.post('/api/users/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.json({ message: 'Logout successful' });
  });
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// app.get('/api/recipes', async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes);
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     res.status(500).json({ message: 'Failed to fetch recipes' });
//   }
// });

app.get('/api/recipes', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const totalRecipes = await Recipe.countDocuments();
    const recipes = await Recipe.find()
      .skip(skip)
      .limit(limit)

    res.json({
      recipes,
      totalPages: Math.ceil(totalRecipes / limit),
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

app.delete('/api/recipes/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { user } = req; // Extract the authenticated user from the token (set by `protect`)

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.author.toString() !== user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this recipe' });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: 'Recipe deleted successfully', deletedRecipe });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
});

app.post('/api/recipes', protect, async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    totalTime,
    servings,
    difficulty,
    category,
    tags,
    author,
  } = req.body;

  if (!title || !description || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Title, description, ingredients and instructions are required' });
  }

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      totalTime,
      servings,
      difficulty,
      category,
      tags,
      author,
    });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ message: 'Failed to add recipe' });
  }
});

app.put('/api/recipes/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const {
    title,
    description,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings,
    difficulty,
    category,
    tags,
    author,
  } = req.body;

  // Recalculate totalTime based on prepTime + cookTime
  const totalTime = prepTime + cookTime;

  // Validate required fields
  if (!title || !description || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Title, description, ingredients and instructions are required' });
  }

  try {
    // Find the recipe to verify the author
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the logged-in user is the author
    if (recipe.author.toString() !== user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to edit this recipe' });
    }

    // Find and update the recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        description,
        ingredients,
        instructions,
        prepTime,
        cookTime,
        totalTime,
        servings,
        difficulty,
        category,
        tags,
        author,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Failed to update recipe' });
  }
});

app.get('/api/users/:userId/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalFavorites = user.favorites.length;

    const paginatedFavorites = user.favorites.slice(skip, skip + limit);

    res.status(200).json({
      favorites: paginatedFavorites,
      totalPages: Math.ceil(totalFavorites / limit),
    });

  } catch (error) {
    console.error('Error fetching user favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register User
app.post('/api/users/register', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'regular',
      firstName,
      lastName,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to log in user' });
  }
});

app.get('/api/users/:userId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/users/:userId', protect, async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send('Old password is incorrect');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});

app.post('/api/recipes/:id/favorite', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(req.params.id);

    if (!user || !recipe) {
      return res.status(404).json({ message: 'User or Recipe not found' });
    }

    if (user.favorites.includes(recipe._id)) {
      user.favorites = user.favorites.filter(id => id.toString() !== recipe._id.toString());
    } else {
      user.favorites.push(recipe._id);
    }

    if (recipe.favoritedBy.includes(req.user.id)) {
      recipe.favoritedBy = recipe.favoritedBy.filter(id => id.toString() !== req.user.id);
    } else {
      recipe.favoritedBy.push(req.user.id);
    }

    await user.save();
    await recipe.save();

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error updating favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// app.get('/api/users/favorites', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate('favorites');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user.favorites);
//   } catch (error) {
//     console.error('Error fetching favorites:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Example protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const startServer = async () => {
  await connectToDatabase();
  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });
};

startServer();
