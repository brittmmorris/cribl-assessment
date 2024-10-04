
# Cribl File System Explorer

A simple File System Explorer built using HTML, CSS, JavaScript (frontend), and AWS Lambda with API Gateway (backend) provisioned via Terraform.

## File Structure

### Backend Directory (Terraform and Lambda)

- **main.tf**: Terraform file that provisions the API Gateway, Lambda function, and necessary IAM roles and permissions.
- **lambda_function.js**: Contains the AWS Lambda function code that returns the file system data.
- **lambda.zip**: The zipped package of `lambda_function.js` to be deployed on AWS Lambda.

### Frontend Directory (UI Files)

- **index.html**: Main entry point for the UI.
- **app.js**: Contains the logic for rendering the file system, folder expansion, and interaction.
- **styles.css**: Custom styles for the UI.
- **tests.js**: Automated tests to validate functionality.

## How to Open the UI

If you're running the project locally, it’s recommended to serve the project through a local web server to avoid issues with CORS (Cross-Origin Resource Sharing). You can do this easily using `npx http-server`.

### Steps to Run with `npx http-server`:

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open your terminal/command line and navigate to the folder containing the project files (the folder where `index.html` is located).
3. Run the following command to start a simple HTTP server:
   ```bash
   npx http-server
   ```
4. The server will start, and you’ll see an address like `http://127.0.0.1:8080` or `http://localhost:8080`.
5. Open this address in your browser, and the app will load without CORS issues.
6. Navigate through the file system using the left pane, and view contents in the right pane.

## Backend Setup and Deployment

The backend uses AWS Lambda to handle requests for the file structure, and API Gateway to expose the Lambda function via a RESTful endpoint. Terraform is used to provision these resources.

### Steps to Update and Deploy the Lambda Function

1. **Modify `lambda_function.js`**:
   - Update the file with any new logic or structure as required.

2. **Zip the Lambda function**:
   - Run the following command to zip up the `lambda_function.js` file:
     ```bash
     zip lambda.zip lambda_function.js
     ```

3. **Deploy via Terraform**:
   - Run the following commands to deploy the updated Lambda function and infrastructure:
     ```bash
     terraform init
     terraform apply
     ```
   - This will create/update the necessary resources in AWS, including the API Gateway and Lambda function.

4. **Access the API**:
   - After deployment, Terraform will output an API Gateway URL. You can use a tool like `curl` or Postman to send a GET request to the `/files` endpoint to retrieve the file structure.

## How to Run Tests

1. Uncomment line 38 in `index.html`.
2. Open or refresh `index.html` in your browser to view test results.
