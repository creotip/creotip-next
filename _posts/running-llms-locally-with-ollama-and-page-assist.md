---
title: 'Running LLMs locally with Ollama, REST API and Page Assist'
excerpt: 'A comprehensive guide for full-stack developers on how to run Large Language Models locally using Ollama, REST API and the Page Assist Chrome extension'
coverImage: '/assets/blog/greek.jpeg'
date: '2024-08-19T12:00:00.000Z'
tags: ['LLM', 'Ollama', 'Page Assist', 'AI', 'local AI development', 'REST API']
author:
  name: AI Assistant
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/greek.jpeg'
---

## Summary

- **Set up Ollama to run LLMs locally on your machine**
- **Learn how to interact with Ollama using its REST API**
- **Install and configure Page Assist Chrome extension for a ChatGPT-like interface**
- **Explore advanced usage and best practices for local LLM deployment**

## Contents

- [Ollama and Page Assist are not replacements for cloud-based AI services](#ollama-and-page-assist-are-not-replacements-for-cloud-based-ai-services)
- [Local LLMs with a user-friendly interface](#local-llms-with-a-user-friendly-interface)
- [Ollama: Your gateway to local LLMs](#ollama-your-gateway-to-local-llms)
- [Getting started with Ollama](#getting-started-with-ollama)
- [Interacting with Ollama using REST API](#interacting-with-ollama-using-rest-api)
- [Page Assist: A Web UI for Local AI Models](#page-assist-a-web-ui-for-local-ai-models)
- [Setting up Page Assist](#setting-up-page-assist)
- [Advanced usage and tips](#advanced-usage-and-tips)
- [The outcome](#the-outcome)
- [Resources](#resources)

## Ollama and Page Assist are not replacements for cloud-based AI services

While Ollama and Page Assist provide powerful tools for running LLMs locally, they complement rather than replace cloud-based AI services. These tools offer unique advantages in terms of privacy, customization, and offline capabilities.

## Local LLMs with a user-friendly interface

Imagine having the power of advanced AI models right on your local machine, with an interface as sleek as ChatGPT. That's exactly what the combination of Ollama and Page Assist offers to full-stack developers. Whether you're prototyping AI-powered applications or exploring natural language processing, these tools provide a robust and user-friendly solution.

## Ollama: Your gateway to local LLMs

Ollama simplifies the process of running large language models on your local machine. It provides an easy way to download, run, and manage various LLMs, making it an excellent choice for developers who want to experiment with AI without relying on cloud-based services.

## Getting started with Ollama

1. **Installation**

   For macOS and Linux:

   ```bash
   curl https://ollama.ai/install.sh | sh
   ```

2. **Running your first model**

   After installation, start using Ollama right away:

   ```bash
   ollama run llama3.1:latest
   ```

3. **Basic interactions**

   Once the model is running, you can start interacting with it:

   ```python
   > Write a simple Python function to calculate the factorial of a number.

   Here's a simple Python function to calculate the factorial of a number:

   def factorial(n):
       if n == 0 or n == 1:
           return 1
       else:
           return n * factorial(n-1)

   # Usage example:
   result = factorial(5)
   print(result)  # Output: 120
   ```

## Interacting with Ollama using REST API

Ollama provides a REST API that allows you to interact with your local models programmatically. This is particularly useful for integrating LLMs into your applications or scripts.

1. **Starting the Ollama server**

   Before using the REST API, make sure the Ollama server is running:

   ```bash
   ollama serve
   ```

2. **Basic API Usage**

   Here's a Python example of how to use the Ollama REST API:

   ```python
   import requests
   import json

   def query_ollama(prompt, model="llama3.1"):
       url = "http://localhost:11434/api/generate"

       payload = {
           "model": model,
           "prompt": prompt
       }

       response = requests.post(url, json=payload)

       if response.status_code == 200:
           return response.json()['response']
       else:
           return f"Error: {response.status_code}, {response.text}"

   # Example usage
   result = query_ollama("Explain the concept of recursion in programming.")
   print(result)
   ```

3. **Advanced API Features**

   The Ollama API also supports more advanced features like streaming responses and setting model parameters:

   ```python
   import requests
   import json

   def stream_ollama(prompt, model="llama3.1"):
       url = "http://localhost:11434/api/generate"

       payload = {
           "model": model,
           "prompt": prompt,
           "stream": True
       }

       with requests.post(url, json=payload, stream=True) as response:
           for line in response.iter_lines():
               if line:
                   decoded_line = line.decode('utf-8')
                   try:
                     json_line = json.loads(decoded_line)
                     print(json_line['response'], end='', flush=True)
                   except json.JSONDecodeError:
                     print(f"Error decoding JSON: {decoded_line}")

   # Example usage
   stream_ollama("Write a short story about a robot learning to paint.")
   ```

This API allows for greater flexibility in how you interact with your local LLMs, enabling integration into various applications and workflows.

## Page Assist: A Web UI for Local AI Models

While Ollama provides a powerful command-line interface and REST API, many developers prefer a more visual and interactive experience. This is where Page Assist comes in. Page Assist is a Chrome extension that offers a ChatGPT-like user interface for interacting with your local AI models.

## Setting up Page Assist

1. **Install the Chrome Extension**

   - Open the Chrome Web Store and search for "Page Assist - A Web UI for Local AI Models"
   - Click on "Add to Chrome" to install the extension

2. **Configure Page Assist**

   - Click on the Page Assist icon in your Chrome toolbar
   - In the settings menu, ensure that the Ollama API endpoint is set correctly (usually `http://localhost:11434`)
   - Click on "Save Settings" to apply your changes

3. **Using Page Assist**
   - Click on the Page Assist icon to open the interface
   - Use the model selector dropdown to choose which Ollama model you want to use
   - Start typing your questions or prompts in the input box
   - Press Enter or click the send button to submit your query

## Advanced usage and tips

1. **Managing multiple models with Ollama**

   ```bash
   ollama list  # List available models
   ollama pull modelname  # Download a new model
   ollama rm modelname  # Remove a model
   ```

2. **Customizing model parameters**
   Create a `Modelfile` to specify parameters:

   ```plaintext
   FROM llama3.1
   PARAMETER temperature 0.7
   PARAMETER top_k 40
   PARAMETER top_p 0.9
   ```

   Then create your custom model:

   ```bash
   ollama create mycustommodel -f Modelfile
   ```

3. **Best practices for using local LLMs**
   - Manage system resources carefully
   - Consider privacy when inputting data
   - Keep both Ollama and Page Assist updated
   - Experiment with different models
   - Practice effective prompt engineering

## The outcome

With Ollama, its REST API, and Page Assist set up, you now have a powerful local LLM setup with multiple ways to interact:

- Run various LLM models locally
- Interact with models using a command-line interface
- Integrate LLMs into your applications using the REST API
- Use a ChatGPT-like interface with Page Assist
- Customize and fine-tune models for specific use cases

This versatile setup allows you to leverage the power of LLMs in various scenarios while maintaining control over your data and resources.

### Resources

- [Ollama GitHub Repository](https://github.com/ollama/ollama)
- [Ollama API Documentation](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Page Assist Chrome Extension](https://chrome.google.com/webstore/detail/page-assist-a-web-ui-for/hhfkcobomkalakplejpokopagjdnkjnl)
- [Anthropic's Guide to Prompt Engineering](https://github.com/anthropics/prompt-eng-interactive-tutorial)
