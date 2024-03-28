#  Simple CDN

This is a simple content delivery network (CDN) for static files.

# Installation

You must have Node.js installed.

    $ git clone https://github.com/Xcyth/Simple-CDN.git
    $ cd Simple-CDN
    $ npm install
    $ npm start

# Configuration

Go into the `index.js` file and change the `const port = 3000` to whatever port you want to use.

In the same file, change the `const password = 'password'` to whatever password you want to use.

Go into the `upload.html` and in the `<script>` tag, change the `if (password != "password")` to whatever password you want to use.

# Contributing

To contribute to this project, please fork it on GitHub and submit a pull request.

# Security

If you find **ANY** security issues, please submit a pull request and/or email me at [xcyth.dev@gmail.com](mailto://xcyth.dev@gmail.com).

# License

This project is licensed under the [MIT license](LICENSE).
