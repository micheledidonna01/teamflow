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