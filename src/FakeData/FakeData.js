const info = [
    {
        eventTitle: "Huminity more",
        description: "Are you ready",
        image: "https://i.ibb.co/DDfwMQh/animal-Shelter.png"
    },
    {
        eventTitle: "Huminity more",
        description: "Are you ready",
        image: "https://i.ibb.co/kHR05bB/babySit.png"
    },
    {
        eventTitle: "Huminity more",
        description: "Are you ready",
        image: "https://i.ibb.co/xGgfyK0/bird-House.png"
    },
    {
        eventTitle: "Huminity more",
        description: "Are you ready",
        image: "https://i.ibb.co/VQR1QvY/child-Support.png"
    },
    {
        eventTitle: "Huminity more",
        description: "Are you ready",
        image: "https://i.ibb.co/VvTXD7Y/clean-Water.png"
    },
    {
        eventTitle: "Huminity more",
        description: "Are you ready",
        image: "https://i.ibb.co/SKZZdVn/refuse-Shelter.png"
    }

]


const fakeData = [...info];


const shuffle = a => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

shuffle(fakeData);

export default fakeData;



