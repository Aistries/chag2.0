document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // In a real application, you'd want to use a secure backend to store user data
    // This example is for demonstration purposes only

    const userCredentials = `Username: ${username}\nPassword: ${password}\n`;

    // Save user credentials to a file (not recommended in practice)
    const fileData = new Blob([userCredentials], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(fileData);
    a.download = 'creds.txt';
    a.click();
    
    // Redirect to index.html

    window.location.href = 'mainpage.html';
});
