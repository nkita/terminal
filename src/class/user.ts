class User {
    name: string
    home: string[]
    currentDir: string[]
    count: number

    constructor(name: string, home: string[]) {
        this.name = name;
        this.home = home;
        this.currentDir = home;
        this.count = 0
    }

    cd(args: string[]) {
        let _tmp: string[] = []
        if (args.length >= 3) {
            return `-bash: cd: ${args.join(": ")}: No such file or directory`
        }
        if (args.length === 1) {
            _tmp = this.home
        } else {
            const path = args[1].split("/")
            if (path[0] === "") {
                // Absolute path
                _tmp = path.slice(1)
            } else {
                // Relative path
                if (path[0] === "~") {
                    // ~ Home directory
                    _tmp = this.home.concat(path.slice(1))
                } else {
                    _tmp = this.currentDir.concat(path)
                }
            }
        }
        // Trim Space And Current Directory Path(./)
        _tmp = _tmp.filter(t => t !== "" && t !== ".")

        // .. Change Directory to Parent #TODO
        while (_tmp.includes("..")) {
            const idx = _tmp.indexOf("..")
            if (idx === 0) {
                _tmp.splice(idx, 1)
            } else {
                _tmp.splice(idx - 1, 2)
            }
        }
        // folder check TODO

        this.currentDir = _tmp
        return null
    }

    pwd = () => "/" + this.currentDir.join("/")

}

export const guest = new User("guest", ["home", "guest"])