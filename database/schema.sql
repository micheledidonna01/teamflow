-- ==========================
-- SCHEMA DI BASE
-- ==========================

DROP TABLE IF EXISTS task_comments, tasks, project_user, projects, team_user, teams, role_user, roles, users, attachments, activities;

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  email_verified_at TIMESTAMP NULL,
  password VARCHAR(255),
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE roles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  description VARCHAR(255) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE role_user (
  user_id BIGINT UNSIGNED,
  role_id BIGINT UNSIGNED,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE teams (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  description TEXT NULL,
  created_by BIGINT UNSIGNED,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE team_user (
  team_id BIGINT UNSIGNED,
  user_id BIGINT UNSIGNED,
  role VARCHAR(50) DEFAULT 'member',
  PRIMARY KEY (team_id, user_id),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE projects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  team_id BIGINT UNSIGNED,
  name VARCHAR(255),
  description TEXT NULL,
  status ENUM('active','paused','completed') DEFAULT 'active',
  due_date DATE NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE project_user (
  project_id BIGINT UNSIGNED,
  user_id BIGINT UNSIGNED,
  role VARCHAR(50) DEFAULT 'contributor',
  PRIMARY KEY (project_id, user_id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id BIGINT UNSIGNED,
  assigned_to BIGINT UNSIGNED NULL,
  title VARCHAR(255),
  description TEXT NULL,
  status ENUM('todo','in_progress','done') DEFAULT 'todo',
  priority ENUM('low','medium','high') DEFAULT 'medium',
  due_date DATE NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE task_comments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  task_id BIGINT UNSIGNED,
  user_id BIGINT UNSIGNED,
  comment TEXT,
  created_at TIMESTAMP NULL,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE attachments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  attachable_id BIGINT UNSIGNED,
  attachable_type VARCHAR(50),
  file_path VARCHAR(255),
  created_at TIMESTAMP NULL
);

CREATE TABLE activities (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED,
  action VARCHAR(100),
  target_type VARCHAR(50),
  target_id BIGINT UNSIGNED,
  details JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ==========================
-- DATI DI BASE
-- ==========================

INSERT INTO roles (id, name, description) VALUES
(1, 'Admin', 'Gestisce tutto il sistema'),
(2, 'Manager', 'Gestisce progetti e team'),
(3, 'Member', 'Collabora sui progetti');

INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES
(1, 'Michele Di Donna', 'michele@example.com', 'hashed_password', NOW(), NOW()),
(2, 'Sara Bianchi', 'sara@example.com', 'hashed_password', NOW(), NOW()),
(3, 'Luca Rossi', 'luca@example.com', 'hashed_password', NOW(), NOW()),
(4, 'Anna Verdi', 'anna@example.com', 'hashed_password', NOW(), NOW());

INSERT INTO role_user (user_id, role_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3);

INSERT INTO teams (id, name, description, created_by, created_at, updated_at) VALUES
(1, 'Team Alpha', 'Team dedicato allo sviluppo frontend', 1, NOW(), NOW()),
(2, 'Team Beta', 'Team backend e API', 2, NOW(), NOW());

INSERT INTO team_user (team_id, user_id, role) VALUES
(1, 1, 'lead'),
(1, 3, 'member'),
(2, 2, 'lead'),
(2, 4, 'member');

INSERT INTO projects (id, team_id, name, description, status, due_date, created_at, updated_at) VALUES
(1, 1, 'Website Redesign', 'Rifacimento completo del sito aziendale', 'active', '2026-06-15', NOW(), NOW()),
(2, 1, 'Landing Page Campaign', 'Landing per la campagna marketing', 'paused', '2026-05-30', NOW(), NOW()),
(3, 2, 'API Integration', 'Integrazione con servizio esterno', 'active', '2026-07-10', NOW(), NOW());

INSERT INTO project_user (project_id, user_id, role) VALUES
(1, 1, 'manager'),
(1, 3, 'contributor'),
(2, 1, 'manager'),
(2, 3, 'contributor'),
(3, 2, 'manager'),
(3, 4, 'contributor');

INSERT INTO tasks (id, project_id, assigned_to, title, description, status, priority, due_date, created_at, updated_at) VALUES
(1, 1, 3, 'Creare prototipo UI', 'Mockup con Figma per homepage', 'in_progress', 'high', '2026-05-10', NOW(), NOW()),
(2, 1, 1, 'Definire palette colori', 'Scegliere colori coerenti con brand', 'todo', 'medium', '2026-05-08', NOW(), NOW()),
(3, 2, 3, 'Implementare responsive design', 'Adattare layout a mobile e tablet', 'todo', 'high', '2026-05-12', NOW(), NOW()),
(4, 3, 4, 'Connettere API esterna', 'Test connessione OAuth e endpoint REST', 'in_progress', 'medium', '2026-05-15', NOW(), NOW());

INSERT INTO task_comments (task_id, user_id, comment, created_at) VALUES
(1, 1, 'Ottimo inizio, aggiungere sezione contatti', NOW()),
(4, 2, 'API key ricevuta, procedo con i test', NOW());

INSERT INTO activities (user_id, action, target_type, target_id, details) VALUES
(1, 'created', 'project', 1, '{"name":"Website Redesign"}'),
(3, 'updated', 'task', 1, '{"status":"in_progress"}'),
(2, 'assigned', 'task', 4, '{"assigned_to":"Anna Verdi"}');
