const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all'

const select = document.querySelector('.breeds')

fetch(BREEDS_URL) 
    .then(res => {
        return res.json();
    })
    .then(data => {
        const breedsObject = data.message; // turned the message into an object
        const breedsArray = Object.keys(breedsObject) //created a variable that uses a method that will loop through the object into an array 
        for(let i = 0; i < breedsArray.length; i++){
            const option = document.createElement('option') // this the way to create an html tag with JS 
            option.value = breedsArray[i] //<option value = 'breed'></option>
            option.innerText = breedsArray[i]
            select.appendChild(option) //adds current <option> tag to the select box list of options 
        }
            
    })

    select.addEventListener('change', event => { //if i were to console.log(event.target) I would get back the select tags which has the <option> tags followed by each breed name  
        let url = `https://dog.ceo/api/breed/${event.target.value}/images/random` //here we are using a template literal that will take the value of any breed to the url 
        getDoggoImg(url) //this is the name of the function and it's param is the url 
        doggoInfo.assignMF() //here we are calling the method 
        doggoInfo.assignAge() //calling 
        doggoInfo.assignLikes()
        doggoInfo.assignDislikes()
        doggoInfo.assignFunFact()
    })

    const img = document.querySelector('.dog-img') //creating a variable named img that is selecting the class dog-img

    const getDoggoImg = url => {
        fetch(url) //going tot he API url above
            .then(res =>{
                return res.json(); //get JSON message back
            })
            .then(data =>{
                img.src = data.message //extract message from JSON and attach to img tag as new
            })
    }


    const doggoInfo = {
        fNames: ['Cassie','Jessi','Peppa','Queen','Millie','Buba','Lilly','Carrie','Cindy','Ivy'],
        mNames: ['Alan','Donnie','King','Leo','Bullet','Tyron','Boba','Fletcher','James','Mike'],
        likesList: ['Puppicino from starbies','Long walks on the beach','Digging holes at dawn','swirling on the trampoline','chasing squirrels','calling people bitch','peeing on the neighbotrs kid'],
        dislikesList:['going to sleep at 8pm','taking showers!!','going to the vet','reading the pawnews','watching the baby'],
        factList: ['Knows how to talk but prefers to bark','has a clone sibling but chooses the easy life','discovered how to travel at the speed of light, but acts stupid','can time travel at 3am EST','knows how to rap battle cats'],
        MF: '',
        rname: '',
        age: '',
        likes: '',
        dislikes: '',
        fact: '',

        assignMF() {
            x = (Math.floor(Math.random() * 2 ) == 0)
            if(x) {
                this.MF = "Female";
                this.assignName(this.fNames)
            }else{
                this.MF = "Male";
                this.assignName(this.mNames)
            }
            document.getElementById("MF").innerHTML = `S: ${this.MF}`
        },

        assignName(array){
            this.rname = array[Math.floor(Math.random()*array.length)]
            document.getElementById("dog-name").innerHTML = `${this.rname}`
        },

        assignAge() {
            this.age = Math.floor(Math.random() * 16 + 1)
            document.getElementById("age").innerHTML = `Age: ${this.age}`
        },

        yatesShuffle(array) {
            let m = array.length, t, i; 
            //while there remain elements to shuffle
            while(m) {
                //picking an element 
                i = Math.floor(Math.random() * m--);
                // and swap it with the current element 
                    t = array[m];
                array[m] = array [i];
                array[i] = t;
            }
            return array;
        },

        assignLikes(){
            this.likes = this.yatesShuffle(this.likesList).slice(0,2)
            document.getElementById('likes').innerHTML = `Likes: ${this.likes[0]}, ${this.likes[1]}`
        },

        assignDislikes(){
            this.dislikes = this.yatesShuffle(this.dislikesList).slice(0,2)
            document.getElementById('dislikes').innerHTML = `Dislikes: ${this.dislikes[0]}, ${this.dislikes[1]}`
        },

        assignFunFact(){
            this.fact = this.factList[Math.floor(Math.random() * this.factList.length )]
            document.getElementById('fun-fact').innerHTML = `Additional Info: ${this.fact}`
        }

    }