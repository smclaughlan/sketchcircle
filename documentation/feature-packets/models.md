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

| column        | type    | max length | default | constraints                            |
| ------------- | ------- | ---------- | ------- | -------------------------------------- |
| sketchbook_id | integer | none       | no      | not null, references: (Sketchbooks.Id) |
| user_id       | integer | none       | no      | not null, references: (Users.Id)       |

### Sketchbooks

| column   | type    | max length | default | constraints                      |
| -------- | ------- | ---------- | ------- | -------------------------------- |
| owner_id | integer | none       | no      | not null, references: (Users.Id) |
| title    | varchar | 200        | no      |                                  |

### Posts

| column        | type    | max length | default      | constraints                            |
| ------------- | ------- | ---------- | ------------ | -------------------------------------- |
| poster_id     | integer | none       | no           | not null, references: (Users.Id)       |
| sketchbook_id | integer | none       | no           | not null, references: (Sketchbooks.Id) |
| body          | text    | none       | no           | not null                               |
| timestamp     | date    | none       | current time | not null                               |

### Goals

| column        | type    | max length | default | constraints                            |
| ------------- | ------- | ---------- | ------- | -------------------------------------- |
| owner_id      | integer | none       | no      | not null, references: (Users.Id)       |
| sketchbook_id | integer | none       | no      | not null, references: (Sketchbooks.Id) |
| title         | varchar | 200        | no      | not null                               |
| description   | varchar | 1000       | no      |                                        |
| target        | integer | none       | no      | not null                               |
| targetdate    | date    | none       | no      | not null                               |
<!--
| datapoints     | integer[] | none       | no           |                                      |
| datapointsdate | date[]    | none       | current time |                                      | -->

### Datapoints

| column    | type    | max length | default      | constraints                      |
| --------- | ------- | ---------- | ------------ | -------------------------------- |
| goal_id   | integer | none       | no           | not null, references: (Goals.id) |
| value     | integer | none       | no           | not null                         |
| timestamp | date    | none       | current time | not null                         |
