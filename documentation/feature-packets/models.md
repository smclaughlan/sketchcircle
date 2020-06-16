# Models

## Model list

- Users
- Follows
- Sketchbooks
- Posts
- Goals

### Users

| column          | type    | max length | default | constraints      |
| --------------- | ------- | ---------- | ------- | ---------------- |
| avatarurl       | text    | none       | no      |                  |
| username        | varchar | 20         | no      | not null, unique |
| hashed_password | binary  | none       | no      | not null         |
| email           | varchar | 50         | no      | not null, unique |

### Follows

| column        | type    | max length | default | constraints                          |
| ------------- | ------- | ---------- | ------- | ------------------------------------ |
| sketchbook_id | integer | none       | no      | not null references: (Sketchbook.Id) |
| user_id       | integer | none       | no      | not null references: (Users.Id)      |

### Sketchbooks

| column   | type    | max length | default | constraints                      |
| -------- | ------- | ---------- | ------- | -------------------------------- |
| owner_id | integer | none       | no      | not null, references: (Users.Id) |

### Posts

| column        | type    | max length | default      | constraints                          |
| ------------- | ------- | ---------- | ------------ | ------------------------------------ |
| poster_id     | integer | none       | no           | not null, references: (Users.Id)     |
| sketchbook_id | integer | none       | no           | not null references: (Sketchbook.Id) |
| body          | text    | none       | no           | not null                             |
| timestamp     | date    | none       | current time | not null                             |

### Goals

| column         | type      | max length | default      | constraints                          |
| -------------- | --------- | ---------- | ------------ | ------------------------------------ |
| owner_id       | integer   | none       | no           | not null, references: (Users.Id)     |
| sketchbook_id  | integer   | none       | no           | not null references: (Sketchbook.Id) |
| target         | integer   | none       | no           | not null                             |
| targetdate     | date      | none       | current time | not null                             |
| datapoints     | integer[] | none       | no           |                                      |
| datapointsdate | date[]    | none       | current time |                                      |
