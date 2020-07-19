function ajax(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseText = "json";
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        xhr.send();
    });
}
// async await  生成器函数更方便的语法糖
async function main() {
    try {
        const users = await ajax("./api/users.json"); // 在then中的g.next将返回值赋予users
        console.log(users);

        const posts = await ajax("./api/users.json");
        console.log(posts);

        const users1 = await ajax("./api/users1.json");
        console.log(users1);
    } catch (error) {
        console.log(error);
    }
}

main()