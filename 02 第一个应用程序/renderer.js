const information = document.getElementById('info')
information.innerText = `本应用正在使用Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和Electron(v${versions.electron()})`

const func = async () => {
    const res = await window.versions.ping()
    console.log(res); // 打印pong
}
func()