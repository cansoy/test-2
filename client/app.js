const login=document.querySelector("#login")
const users=document.querySelector("#users")
const todos=document.querySelector("#todos")
const logout=document.querySelector("#logout")
const p=document.querySelectorAll("p")

login.addEventListener("click",async(e)=>{
    const res=await fetch("http://127.0.0.1:3000/logged",
        {
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({username:"muhammed",password:"cansoy",city:"istanbul-client",age:"99-client"}),
            credentials:"include"
        }
    )
    if (res.status===401) {
        return p[0].textContent=res.statusText
    }
    console.log("not reach")
    const data =await res.json()
    console.log(data)
    p[0].textContent=JSON.stringify(data)
})

users.addEventListener("click",async(e)=>{
    const res=await fetch("http://127.0.0.1:3000/users",
        {
            method:"GET",
            // headers:{"content-type":"application/json"},
            credentials:"include"
        }
    )
    if (res.status===401) {
        return p[1].textContent=res.statusText
    }
    const data =await res.json()
    p[1].textContent=JSON.stringify(data)
})

todos.addEventListener("click",async(e)=>{
    const res=await fetch("http://127.0.0.1:3000/todos",
        {
            method:"GET",
            // headers:{"content-type":"application/json"},
            // body:JSON.stringify({username:"muhammed",password:"cansoy",city:"istanbul-client",age:"99-client"}),
            credentials:"include"
        }
    )
    if (res.status===401) {
        return p[2].textContent=res.statusText
    }
    console.log("not reach")
    const data =await res.json()
    p[2].textContent=JSON.stringify(data)
})

logout.addEventListener("click",async(e)=>{
    const res=await fetch("http://127.0.0.1:3000/logout",
        {
            method:"GET",
            // headers:{"content-type":"application/json"},
            // body:JSON.stringify({username:"muhammed",password:"cansoy",city:"istanbul-client",age:"99-client"}),
            credentials:"include"
        }
    )
    if (res.status===401) {
        return p[3].textContent=res.statusText
    }
    console.log("not reach")
    const data =await res.json()
    p[3].textContent=JSON.stringify(data)
})
