const signupForm = document.getElementById('container');
const serverUrl = "http://127.0.0.1:8000"; // 서버 API 엔드포인트 URL

toggle = () => {
  signupForm.classList.toggle('sign-in'); //login
  signupForm.classList.toggle('sign-up'); //회원가입
}

setTimeout(() => {
  signupForm.classList.add('sign-in');
}, 200);

// ***** 회원가입 버튼 클릭 시 동작 ***** //
const signUpButton = document.querySelector('.form.sign-up button');
signUpButton.addEventListener('click', (event) => {
  event.preventDefault();

  // 사용자 입력 정보 가져오기
  const usernameInput = document.querySelector('.form.sign-up input[type="text"]');
  const emailInput = document.querySelector('.form.sign-up input[type="email"]');
  const passwordInput = document.querySelector('.form.sign-up input[type="password"]');

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // 입력 데이터 유효성 검사
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }

  // AJAX 요청으로 사용자 정보 전송
  const data = {
    name: username,
    email: email,
    password: password
  };

  // 회원 정보를 서버로 전송
  fetch(serverUrl+'/user', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        // 요청이 성공한 경우 처리
        alert("Congratulations! You have successfully signed up!");
        location.reload();
        return response.json();
      } else {
        // 요청이 실패한 경우 처리
        throw new Error('Error: ' + response.status);
      }
    })
    .catch(error => {
      // 오류 처리
      console.error(error);
    });
});


// ***** 로그인 ***** //
//const loginForm = document.getElementById("login-form");// loginForm 변수로 "login-form"이라는 ID를 가진 요소를 찾아서 할당
//const loginErrorMsg = document.getElementById("login-error-msg");


//getElementById 메서드는 id 속성의 값만을 인자로 받아 해당 요소를 가져오는데, 인자로 전달된 값에는 .이 포함되어서는 안 됩니다. 따라서 아래의 코드에서 수정이 필요합니다:
const loginButton = document.getElementById("loginButton");
// 로그인 버튼 클릭 이벤트
loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  // 사용자 입력 정보 가져오기
  const emailInput = document.querySelector('.form.sign-in input[type="email"]');
  const passwordInput = document.querySelector('.form.sign-in input[type="password"]');

  const email = emailInput.value;
  const password = passwordInput.value;

  const data = 'username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}';

  // 로그인 정보를 서버로 전송
  fetch(serverUrl + '/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
  })
  .then(response => {
      if (response.ok) {
          return response.json(); // 응답을 JSON 형태로 변환
      } else {
          throw new Error('Error: ' + response.status);
      }
  })
  .then(data => {
      localStorage.setItem('token', data.access_token); // 받아온 토큰을 저장
      alert("You have successfully logged in. Welcome!");
      window.location.href = 'target.html'; // 로그인 성공 시 이동할 페이지
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Login failed. Please check your credentials and try again.');
  });
  
});



// ***** 로그인 문제 되던 코드 ***** //

// ***** 로그인 ***** //
//const loginForm = document.getElementById("login-form");// loginForm 변수로 "login-form"이라는 ID를 가진 요소를 찾아서 할당
//const loginErrorMsg = document.getElementById("login-error-msg");


// //getElementById 메서드는 id 속성의 값만을 인자로 받아 해당 요소를 가져오는데, 인자로 전달된 값에는 .이 포함되어서는 안 됩니다. 따라서 아래의 코드에서 수정이 필요합니다:
// const loginButton = document.getElementById("loginButton");
// // 로그인 버튼 클릭 이벤트
// loginButton.addEventListener("click", (event) => {
//   event.preventDefault();

//   // 사용자 입력 정보 가져오기
//   const emailInput = document.querySelector('.form.sign-in input[type="email"]');
//   const passwordInput = document.querySelector('.form.sign-in input[type="password"]');

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   const data = {
//     username: email,
//     password: password
//   };

//   // 로그인 정보를 서버로 전송
//   fetch(serverUrl + '/login', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//   })
//   .then(response => {
//       if (response.ok) {
//           return response.json(); // 응답을 JSON 형태로 변환
//       } else {
//           throw new Error('Error: ' + response.status);
//       }
//   })
//   .then(data => {
//       localStorage.setItem('token', data.access_token); // 받아온 토큰을 저장
//       alert("You have successfully logged in. Welcome!");
//       window.location.href = 'target.html'; // 로그인 성공 시 이동할 페이지
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// });
