export const EmailHtmlTemplate: string = `
<!DOCTYPE html>
<html>
<head>
  <title>File Shared Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 0;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #2d3748;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 1.5rem;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
    }
    .file-section {
      display: flex;
      align-items: center;
      border: 1px solid #eeeeee;
      padding: 15px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .file-thumbnail {
      flex: 0 0 80px;
      margin-right: 15px;
    }
    .file-thumbnail img {
      width: 80px;
      border-radius: 5px;
    }
    .file-details {
      flex: 1;
    }
    .footer {
      text-align: center;
      font-size: 0.9rem;
      color: #888888;
      padding: 15px;
      background-color: #f1f1f1;
    }
    .button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 1rem;
      display: inline-block;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      File Shared by Daniel Hashmi
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>
        Daniel Hashmi (<a href="mailto:danialhashmi418@gmail.com">danialhashmi418@gmail.com</a>)
        has shared the following item with you:
      </p>
      <div class="file-section">
        <div class="file-thumbnail">
          <img src="https://via.placeholder.com/80" alt="PDF Icon">
        </div>
        <div class="file-details">
          <strong>Dunla Math Handbook First Edition (2024)</strong><br>
          Authored by Daniel Hashmi<br>
          <small>PDF Document</small>
        </div>
      </div>
      <p style="text-align: center;">
        <a href="YOUR_FILE_LINK" class="button">Open File</a>
      </p>
    </div>
    <div class="footer">
      <p>Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
      <p>You received this email because a file was shared with you via our platform.</p>
    </div>
  </div>
</body>
</html>

`