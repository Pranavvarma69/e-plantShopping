import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useDispatch,useSelector } from 'react-redux';

// Optional: You can move this array to a separate file like plantData.js for better structure
const plantsArray = [
    {
        category: "Air Purifying Plants",
        plants: [
            {
                name: "Snake Plant",
                image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                description: "Produces oxygen at night, improving air quality.",
                cost: "$15"
            },
            {
                name: "Spider Plant",
                image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                description: "Filters formaldehyde and xylene from the air.",
                cost: "$12"
            },
            {
                name: "Peace Lily",
                image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                description: "Removes mold spores and purifies the air.",
                cost: "$18"
            },
            {
                name: "Boston Fern",
                image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                description: "Adds humidity to the air and removes toxins.",
                cost: "$20"
            },
            {
                name: "Rubber Plant",
                image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                description: "Easy to care for and effective at removing toxins.",
                cost: "$17"
            },
            {
                name: "Aloe Vera",
                image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                description: "Purifies the air and has healing properties for skin.",
                cost: "$14"
            }
        ]
    },
    {
        category: "Aromatic Fragrant Plants",
        plants: [
            {
                name: "Lavender",
                image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop",
                description: "Calming scent, used in aromatherapy.",
                cost: "$20"
            },
            {
                name: "Jasmine",
                image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop",
                description: "Sweet fragrance, promotes relaxation.",
                cost: "$18"
            },
            {
                name: "Rosemary",
                image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                description: "Invigorating scent, often used in cooking.",
                cost: "$15"
            },
            {
                name: "Mint",
                image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                description: "Refreshing aroma, used in teas and cooking.",
                cost: "$12"
            },
            {
                name: "Lemon Balm",
                image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                description: "Citrusy scent, relieves stress and promotes sleep.",
                cost: "$14"
            },
            {
                name: "Hyacinth",
                image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                description: "Hyacinth is a beautiful flowering plant known for its fragrant.",
                cost: "$22"
            }
        ]
    },
    {
        category: "Insect Repellent Plants",
        plants: [
            {
                name: "Oregano",
                image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
                description: "Contains compounds that deter certain insects.",
                cost: "$10"
            },
            {
                name: "Marigold",
                image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
                description: "Natural insect repellent, adds color to the garden.",
                cost: "$8"
            },
            {
                name: "Geraniums",
                image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
                description: "Repels insects, adds pleasant scent.",
                cost: "$20"
            },
            {
                name: "Basil",
                image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
                description: "Repels flies and mosquitoes, also used in cooking.",
                cost: "$9"
            },
            {
                name: "Catnip",
                image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
                description: "Repels mosquitoes and attracts cats.",
                cost: "$13"
            }
        ]
    },
    {
        category: "Medicinal Plants",
        plants: [
            {
                name: "Echinacea",
                image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
                description: "Boosts immune system, helps fight colds.",
                cost: "$16"
            },
            {
                name: "Peppermint",
                image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
                description: "Relieves digestive issues and headaches.",
                cost: "$13"
            },
            {
                name: "Chamomile",
                image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
                description: "Soothes anxiety and promotes sleep.",
                cost: "$15"
            },
            {
                name: "Calendula",
                image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
                description: "Heals wounds and soothes skin irritations.",
                cost: "$12"
            }
        ]
    },
    {
        category: "Low Maintenance Plants",
        plants: [
            {
                name: "ZZ Plant",
                image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop",
                description: "Thrives in low light and requires minimal watering.",
                cost: "$25"
            },
            {
                name: "Pothos",
                image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
                description: "Tolerates neglect and can grow in various conditions.",
                cost: "$10"
            },
            {
                name: "Cast Iron Plant",
                image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
                description: "Hardy plant that tolerates low light and neglect.",
                cost: "$20"
            },
            {
                name: "Succulents",
                image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
                description: "Drought-tolerant plants with unique shapes and colors.",
                cost: "$18"
            },
            {
                name: "Aglaonema",
                image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
                description: "Requires minimal care and adds color to indoor spaces.",
                cost: "$22"
            }
        ]
    }
];

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const calculateTotalQuantity = () => {
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
         };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prev) => ({
            ...prev,
            [product.name]: true,
        }));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const navbarStyle = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const navLinksStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const linkStyle = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    return (
        <div>
            <div className="navbar" style={navbarStyle}>
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" onClick={handleHomeClick} style={{ textDecoration: 'none' }}>
                        <div>
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>
                <div style={navLinksStyle}>
                    <a href="#" onClick={handlePlantsClick} style={linkStyle}>Plants</a>
                    <a href="#" onClick={handleCartClick} style={linkStyle}>
                        <h1 className='cart'>
                            🛒
                        </h1>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category) =>
                        category.plants.map((plant) => (
                            <div key={plant.name} className="product-card">
                                <img src={plant.image} alt={plant.name} />
                                <h3>{plant.name}</h3>
                                <p>{plant.description}</p>
                                <p>{plant.cost}</p>
                                <button onClick={() => handleAddToCart(plant)}>
                                    {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;