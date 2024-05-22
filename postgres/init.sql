CREATE TABLE workspaces (
    workspace_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT,
    workspace_id INT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE (workspace_id, start_time, end_time)
);


INSERT INTO workspaces (name, description) VALUES
('Ap 1', 'Description for Workspace 1'),
('Ap 2', 'Description for Workspace 2'),
('Ap 3', 'Description for Workspace 1'),
('Ap 4', 'Description for Workspace 2'),
('Ap 5', 'Description for Workspace 1'),
('Ap 6', 'Description for Workspace 2'),
('Ap 7', 'Description for Workspace 1'),
('Ap 8', 'Description for Workspace 2'),
('Ap 9', 'Description for Workspace 1'),
('Ap 10', 'Description for Workspace 2');

INSERT INTO users (name) VALUES
('Fanny');