#!/usr/bin/python3

from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

db_config = {
        'host': 'localhost',
        'user': 'girum',
        'password': '2315',
        'database': 'e_mechanic',
        }

@app.route('/api/symptoms', methods=['GET'])
def get_symptoms():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        cursor.execute('SELECT Symptom FROM symptoms')
        symptoms = cursor.fetchall()

        return jsonify({'symptoms': symptoms})
    finally:
        cursor.close()
        connection.close()

@app.route('/api/questions', methods=['GET'])
def get_questions():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        cursor.execute('SELECT Question FROM questions')
        symptoms = cursor.fetchall()

        return jsonify({'questions': questions})
    finally:
        cursor.close()
        connection.close()

@app.route('/api/problems', methods=['GET'])
def get_problems():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        cursor.execute('SELECT Problem FROM problems')
        symptoms = cursor.fetchall()

        return jsonify({'problems': problems})
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run()
