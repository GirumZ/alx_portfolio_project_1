-- set the database

USE e_mechanic;

-- create symptoms table

CREATE TABLE symptoms (
	Symptom_id INT PRIMARY KEY,
	Symptom VARCHAR(250),
	Sensation VARCHAR(25),
	Followup_available VARCHAR(10)
);

-- create questions table

CREATE TABLE questions (
	Question_id INT PRIMARY KEY,
	Question VARCHAR(250),
	Symptom_id INT
);

-- create problems table

CREATE TABLE problems (
	Problem_id INT PRIMARY KEY,
	Problem VARCHAR(1000),
	Solution VARCHAR(1000),
	Question_id INT,
	Symptom_id INT
);

-- create tips table
CREATE TABLE tips (
	Tip_id INT PRIMARY KEY,
	Tip_short VARCHAR(250),
	Tip_long VARCHAR(1000)
);

-- create obd table

CREATE TABLE obd (
	Code VARCHAR(5) PRIMARY KEY,
	Description VARCHAR(250)
);
