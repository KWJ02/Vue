// 웹팩 사용 이유 : 수도없이 많아지는 js파일들을 동시에 관리하기 위함
module.exports = {
  entry: { // entry -> 많은 js파일들 중에 가장 main이 되는 js파일이 entry가 됨.
    app: './main.js' // app -> 합쳐지는 파일들의 이름 변수.
  },
  module: { // webpack의 핵심
    rules: [{

    }]
  },
  plugins: [],
  output: {
    filename: '[name].js', // [name].js나 entry의 app을 가져와서 'app.js' 둘 다 가능. 아마 [name]은 entry의 파일이름 변수가 오는 듯
    path: './dist', // 최종산물이 VUE폴더에 dist라는 폴더를 생성해서, 거기다가 [name].js 저장.
                    // 그렇게 되면 numberBaseball.html의 body는 <div id="root"><div><script src="./dist/app.js"></script>로 굉장히 간단해짐.
  },  
};

