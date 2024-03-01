from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Replace with your MySQL database connection parameters
DB_CONFIG = {
    'host': 'localhost',
    'user': 'girum',
    'password': '2315',
    'database': 'e_mechanic',
}

def execute_query(query, params=None):
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor(dictionary=True)

        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)

        data = cursor.fetchall()
        return data
    except Exception as e:
        print(f"Error: {e}")
        raise
    finally:
        cursor.close()
        connection.close()

# to list all the symptoms
@app.route('/api/symptoms', methods=['GET'])
def get_symptoms():
    query = 'SELECT * FROM symptoms'
    symptoms = execute_query(query)
    return jsonify(symptoms)

# to list all questions
@app.route('/api/questions', methods=['GET'])
def get_questions():
    query = 'SELECT * FROM questions'
    questions = execute_query(query)
    return jsonify(questions)

# to list all the problems
@app.route('/api/problems', methods=['GET'])
def get_problems():
    query = 'SELECT * FROM problems'
    problems = execute_query(query)
    return jsonify(problems)

# to show a symptom with specific Symptom_id
@app.route('/api/symptoms/<int:Symptom_id>', methods=['GET'])
def get_symptoms_id(Symptom_id):
    query = 'SELECT * FROM symptoms WHERE Symptom_id = %s'
    params = (Symptom_id,)
    symptoms = execute_query(query, params)
    return jsonify(symptoms)

# to show a question with specific Symptom_id
@app.route('/api/questions/<int:Symptom_id>', methods=['GET'])
def get_questions_id(Symptom_id):
    query = 'SELECT * FROM questions WHERE Symptom_id = %s'
    params = (Symptom_id,)
    questions = execute_query(query, params)
    return jsonify(questions)

# to show a problem with specific Question_id
@app.route('/api/problems/<int:Question_id>', methods=['GET'])
def get_problems_id(Question_id):
    query = 'SELECT * FROM problems WHERE Question_id = %s'
    params = (Question_id,)
    problems = execute_query(query, params)
    return jsonify(problems)

# to show a symptom with specific Sensation type
@app.route('/api/symptoms/Sensation/<string:Sensation>', methods=['GET'])
def get_symptoms_sensation(Sensation):
    query = 'SELECT * FROM symptoms WHERE Sensation = %s'
    params = (Sensation,)
    symptoms = execute_query(query, params)
    return jsonify(symptoms)

# to show a symptom with followup availability
@app.route('/api/symptoms/Followup_available/<string:Followup_available>', methods=['GET'])
def get_symptoms_followup(Followup_available):
    query = 'SELECT * FROM symptoms WHERE Followup_available = %s'
    params = (Followup_available,)
    symptoms = execute_query(query, params)
    return jsonify(symptoms)

# to show a problem with specific Symptom_id
@app.route('/api/problems/Symptom_id/<int:Symptom_id>', methods=['GET'])
def get_problems_question_id(Symptom_id):
    query = 'SELECT * FROM problems WHERE Symptom_id = %s'
    params = (Symptom_id,)
    problems = execute_query(query, params)
    return jsonify(problems)


if __name__ == '__main__':
    app.run()

