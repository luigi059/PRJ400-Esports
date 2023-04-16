import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import postController from './controllers/postController.js';
import auth from './middleware/auth.js';
import routes from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Load the environment variables from a .env file.
dotenv.config();

/* FILE STORAGE */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	},
});
const upload = multer({ storage: storage });

// Connect to MongoDB
const DB = process.env.DATABASE;
mongoose
	.connect(process.env.MONGODB_URI || DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB connection successful'));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post(
	'/api/post/create',
	auth,
	upload.single('file'),
	postController.createPost
);

app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port);
