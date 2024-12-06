from flask import Flask, render_template, jsonify
import subprocess

app = Flask(__name__, static_folder="static", template_folder="templates")

# List of URLs to check
urls = [
    "https://graph-639312966170.us-central1.run.app",
    "https://news-639312966170.us-central1.run.app",
    "https://cryptocurrencies-front-639312966170.us-central1.run.app"
]

# Function to check service status
def check_service_status(url):
    try:
        result = subprocess.run(
            ["curl", "-I", "-s", "-o", "/dev/null", "-w", "%{http_code}", url],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=5
        )
        status_code = int(result.stdout.strip())
        return {"url": url, "status": status_code, "ok": 200 <= status_code < 400}
    except Exception as e:
        return {"url": url, "status": "unreachable", "ok": False}

# API endpoint to check statuses
@app.route("/check-services", methods=["GET"])
def check_services():
    statuses = [check_service_status(url) for url in urls]
    return jsonify(statuses)

# Route to serve the frontend
@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)