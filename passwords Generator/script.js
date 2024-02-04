function generatePassword(length, useUppercase, useNumbers, useSymbols, keywords) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_+=';
  
  let validChars = lowercaseChars;
  let password = '';

  if (useUppercase) validChars += uppercaseChars;
  if (useNumbers) validChars += numberChars;
  if (useSymbols) validChars += symbolChars;

  let keywordChars = '';
  if (keywords && keywords.length > 0) {
      for (let k = 0; k < keywords.length && password.length < length; k++) {
          const keyword = keywords[k];
          for (let i = 0; i < keyword.length && password.length < length; i++) {
              if (validChars.includes(keyword[i])) {
                  password += keyword[i];
                  keywordChars += keyword[i];
              }
          }
      }
  }

  // Fill in remaining characters with random valid characters
  for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
  }

  return password;
}

document.getElementById('password-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const length = parseInt(document.getElementById('length').value);
  const useUppercase = document.getElementById('uppercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;
  const keywordsInput = document.getElementById('keywords').value;
  const keywords = keywordsInput.split(',').map(keyword => keyword.trim());

  const generatedPassword = generatePassword(length, useUppercase, useNumbers, useSymbols, keywords);
  document.getElementById('generated-password').textContent = generatedPassword;
});
