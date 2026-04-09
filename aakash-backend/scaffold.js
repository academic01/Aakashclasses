const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');
const routesDir = path.join(__dirname, 'routes');
const controllersDir = path.join(__dirname, 'controllers');
const middlewareDir = path.join(__dirname, 'middleware');
const configDir = path.join(__dirname, 'config');
const utilsDir = path.join(__dirname, 'utils');

const dirs = [modelsDir, routesDir, controllersDir, middlewareDir, configDir, utilsDir];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

fs.writeFileSync(path.join(configDir, 'database.js'), '// Database config\\n');
fs.writeFileSync(path.join(middlewareDir, 'auth.middleware.js'), '// Auth middleware\\n');

const videoModel = "const mongoose = require('mongoose');\\nconst Schema = mongoose.Schema;\\nconst VideoSchema = new Schema({ title: String });\\nmodule.exports = mongoose.model('Video', VideoSchema);";
fs.writeFileSync(path.join(modelsDir, 'Video.js'), videoModel);

const coreModules = ['auth', 'user', 'course', 'video', 'test', 'live', 'payment', 'admin', 'notification', 'settings'];

coreModules.forEach(mod => {
    const ctrlContent = "const " + mod + "Controller = { getAll: async (req, res) => { res.json({ message: '" + mod + " routes connected' }); } };\\nmodule.exports = " + mod + "Controller;";
    fs.writeFileSync(path.join(controllersDir, mod + '.controller.js'), ctrlContent);

    const routeContent = "const express = require('express');\\nconst router = express.Router();\\nconst " + mod + "Controller = require('../controllers/" + mod + ".controller');\\nrouter.get('/', " + mod + "Controller.getAll);\\nmodule.exports = router;";
    fs.writeFileSync(path.join(routesDir, mod + '.routes.js'), routeContent);
});

console.log("Backend scaffolded successfully!");
