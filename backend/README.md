# Mr. Indoram Portfolio Backend

A simple Python Flask backend to handle form submissions and email notifications for the Mr. Indoram portfolio website.

## Features

- Contact form handling
- Job application processing
- Login attempt notifications
- Newsletter subscriptions
- Password reset requests
- Email notifications to arjunkumar73384@gmail.com

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up email configuration:
   - For Gmail, you'll need to generate an App Password
   - Set the EMAIL_PASSWORD environment variable:
```bash
export EMAIL_PASSWORD="your-gmail-app-password"
```

3. Run the server:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/contact
Handle contact form submissions
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "subject": "project",
  "message": "Hello, I'd like to discuss a project...",
  "applyNow": false,
  "newsletter": true
}
```

### POST /api/hiring
Handle job applications
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "123-456-7890",
  "position": "senior-fullstack",
  "linkedin": "https://linkedin.com/in/janesmith",
  "github": "https://github.com/janesmith",
  "skills": ["javascript", "react", "nodejs"],
  "experience": "4-6",
  "availability": "2weeks",
  "message": "I'm excited to join your team...",
  "resume": "https://example.com/resume.pdf"
}
```

### POST /api/login
Handle login attempts (demo authentication)
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

### POST /api/newsletter
Handle newsletter subscriptions
```json
{
  "email": "subscriber@example.com"
}
```

### POST /api/forgot-password
Handle password reset requests
```json
{
  "resetEmail": "user@example.com"
}
```

## Email Configuration

The backend uses Gmail SMTP to send email notifications. To set this up:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password for the application
3. Set the EMAIL_PASSWORD environment variable to your app password

## Security Notes

- This is a demo backend with basic authentication
- In production, implement proper authentication, validation, and security measures
- Use environment variables for sensitive configuration
- Consider rate limiting and input sanitization
- Use HTTPS in production

## Integration with Frontend

The frontend JavaScript automatically sends form data to these endpoints. Make sure the backend is running when testing the forms on the website.

## Deployment

For production deployment:

1. Use a production WSGI server like Gunicorn
2. Set up proper environment variables
3. Configure a reverse proxy (nginx)
4. Use HTTPS
5. Implement proper logging and monitoring