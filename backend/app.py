#!/usr/bin/env python3
"""
Mr. Indoram Portfolio Backend
A simple Python Flask backend to handle form submissions and email notifications.
"""

from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import smtplib
import json
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
EMAIL_CONFIG = {
    'smtp_server': 'smtp.gmail.com',
    'smtp_port': 587,
    'email': 'arjunkumar73384@gmail.com',
    'password': os.environ.get('EMAIL_PASSWORD', 'your-app-password-here')  # Use app password for Gmail
}

def send_email(subject, body, to_email=EMAIL_CONFIG['email']):
    """Send email notification"""
    try:
        msg = MimeMultipart()
        msg['From'] = EMAIL_CONFIG['email']
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MimeText(body, 'html'))
        
        server = smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port'])
        server.starttls()
        server.login(EMAIL_CONFIG['email'], EMAIL_CONFIG['password'])
        text = msg.as_string()
        server.sendmail(EMAIL_CONFIG['email'], to_email, text)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        return False

@app.route('/')
def home():
    """Basic home route"""
    return jsonify({
        'message': 'Mr. Indoram Portfolio Backend API',
        'version': '1.0.0',
        'endpoints': {
            'contact': '/api/contact',
            'hiring': '/api/hiring',
            'login': '/api/login',
            'newsletter': '/api/newsletter'
        }
    })

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Prepare email content
        subject = f"New Contact Form Submission from {data['name']}"
        
        email_body = f"""
        <html>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {data['name']}</p>
            <p><strong>Email:</strong> {data['email']}</p>
            <p><strong>Phone:</strong> {data.get('phone', 'Not provided')}</p>
            <p><strong>Subject:</strong> {data.get('subject', 'Not specified')}</p>
            <p><strong>Apply for Hiring:</strong> {'Yes' if data.get('applyNow') else 'No'}</p>
            <p><strong>Newsletter Subscription:</strong> {'Yes' if data.get('newsletter') else 'No'}</p>
            
            <h3>Message:</h3>
            <p>{data['message']}</p>
            
            <hr>
            <p><small>Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</small></p>
        </body>
        </html>
        """
        
        # Send email
        if send_email(subject, email_body):
            return jsonify({'message': 'Contact form submitted successfully!'}), 200
        else:
            return jsonify({'error': 'Failed to send email notification'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hiring', methods=['POST'])
def handle_hiring():
    """Handle hiring application submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'skills', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Prepare email content
        subject = f"New Job Application from {data['name']}"
        
        skills_list = ', '.join(data['skills']) if isinstance(data['skills'], list) else data['skills']
        
        email_body = f"""
        <html>
        <body>
            <h2>New Job Application</h2>
            <p><strong>Name:</strong> {data['name']}</p>
            <p><strong>Email:</strong> {data['email']}</p>
            <p><strong>Phone:</strong> {data.get('phone', 'Not provided')}</p>
            <p><strong>Position:</strong> {data.get('position', 'Not specified')}</p>
            <p><strong>LinkedIn:</strong> {data.get('linkedin', 'Not provided')}</p>
            <p><strong>GitHub:</strong> {data.get('github', 'Not provided')}</p>
            <p><strong>Experience:</strong> {data.get('experience', 'Not specified')}</p>
            <p><strong>Availability:</strong> {data.get('availability', 'Not specified')}</p>
            <p><strong>Resume/Portfolio:</strong> {data.get('resume', 'Not provided')}</p>
            
            <h3>Technical Skills:</h3>
            <p>{skills_list}</p>
            
            <h3>Why they want to join:</h3>
            <p>{data['message']}</p>
            
            <hr>
            <p><small>Applied on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</small></p>
        </body>
        </html>
        """
        
        # Send email
        if send_email(subject, email_body):
            return jsonify({'message': 'Application submitted successfully!'}), 200
        else:
            return jsonify({'error': 'Failed to send email notification'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def handle_login():
    """Handle login attempts"""
    try:
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Simple demo authentication (replace with real authentication)
        if email == 'admin@example.com' and password == 'password':
            # Send login notification email
            subject = "New Login to Mr. Indoram Portfolio"
            email_body = f"""
            <html>
            <body>
                <h2>New Login Notification</h2>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                <p><strong>IP Address:</strong> {request.remote_addr}</p>
                
                <p>If this wasn't you, please secure your account immediately.</p>
            </body>
            </html>
            """
            
            send_email(subject, email_body)
            
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'email': email,
                    'name': 'Admin User',
                    'role': 'admin'
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/newsletter', methods=['POST'])
def handle_newsletter():
    """Handle newsletter subscriptions"""
    try:
        data = request.get_json()
        
        email = data.get('email')
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Send subscription notification
        subject = "New Newsletter Subscription"
        email_body = f"""
        <html>
        <body>
            <h2>New Newsletter Subscription</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Subscribed on:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        </body>
        </html>
        """
        
        if send_email(subject, email_body):
            return jsonify({'message': 'Successfully subscribed to newsletter!'}), 200
        else:
            return jsonify({'error': 'Failed to process subscription'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/forgot-password', methods=['POST'])
def handle_forgot_password():
    """Handle password reset requests"""
    try:
        data = request.get_json()
        
        email = data.get('resetEmail') or data.get('email')
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Send password reset notification
        subject = "Password Reset Request"
        email_body = f"""
        <html>
        <body>
            <h2>Password Reset Request</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Requested on:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p><strong>IP Address:</strong> {request.remote_addr}</p>
            
            <p>A password reset was requested for this email address.</p>
            <p>If this wasn't you, please ignore this email.</p>
        </body>
        </html>
        """
        
        if send_email(subject, email_body):
            return jsonify({'message': 'Password reset link sent to your email!'}), 200
        else:
            return jsonify({'error': 'Failed to send reset email'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("Starting Mr. Indoram Portfolio Backend...")
    print("Available endpoints:")
    print("  - POST /api/contact - Handle contact form submissions")
    print("  - POST /api/hiring - Handle job applications")
    print("  - POST /api/login - Handle login attempts")
    print("  - POST /api/newsletter - Handle newsletter subscriptions")
    print("  - POST /api/forgot-password - Handle password reset requests")
    print("\nNote: Configure EMAIL_PASSWORD environment variable for email functionality")
    
    app.run(debug=True, host='0.0.0.0', port=5000)