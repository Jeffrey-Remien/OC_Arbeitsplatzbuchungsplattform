CREATE TABLE workspaces (
    workspace_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

INSERT INTO workspaces (name, description) VALUES
('Workspace 1', 'Description for Workspace 1'),
('Workspace 2', 'Description for Workspace 2');
