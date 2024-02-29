from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

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

@app.route('/api/symptoms', methods=['GET'])
def get_symptoms():
    query = 'SELECT * FROM symptoms'
    symptoms = execute_query(query)
    return jsonify({'symptoms': symptoms})

@app.route('/api/questions/<int:Symptom_id>', methods=['GET'])
def get_questions(Symptom_id):
    query = 'SELECT * FROM questions WHERE Symptom_id = %s'
    params = (Symptom_id,)
    questions = execute_query(query, params)
    return jsonify({'questions': questions})

@app.route('/api/problems/<int:Question_id>', methods=['GET'])
def get_possible_problems(Question_id):
    query = 'SELECT * FROM problems WHERE Question_id = %s'
    params = (Question_id,)
    problems = execute_query(query, params)
    return jsonify({'problems': problems})

if __name__ == '__main__':
    app.run(debug=True)

