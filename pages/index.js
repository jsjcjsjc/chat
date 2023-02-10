import React, { useState } from 'react';
import openai from 'openai';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    openai.promise = require('bluebird');
    openai.defaults.timeout = 0;

    // 在此处设置 OpenAI API Key
    openai.defaults.key = process.env.OPENAI_API_KEY;

    const response = await openai.text_davinci.create_prompt({
      prompt: inputValue,
      max_tokens: 100,
    });

    setOutputValue(response.choices[0].text);
  };

  return (
    <div>
      <h1>智能聊天页面</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">发送</button>
      </form>
      <p>{outputValue}</p>
    </div>
  );
};

export default ChatPage;
