#!/usr/bin/env python3

"""Module runs a simple flask app"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)


class Config:
    """Default Babel configs"""

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


@app.route("/", strict_slashes=False)
def index():
    """Defines route /"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run()
