'use client'

import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const menuCategories = [
  {
    title: 'BREAKFAST',
    items: [
      {
        name: 'Masala Dosa',
        description: 'Crispy fermented crepe stuffed with spiced potato filling, served with sambar and chutneys',
        price: '₹280',
        image: 'https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-500x500.jpg'
      },
      {
        name: 'CHOLE BHATURE',
        description: 'Fluffy deep-fried bread served with spicy chickpea curry and pickled onions',
        price: '₹320',
        image: 'https://cdn.uengage.io/uploads/28289/image-14DG1B-1723180624.jpg'
      },
      {
        name: 'POHA',
        description: 'Traditional flattened rice dish with curry leaves, mustard seeds, and fresh coriander',
        price: '₹220',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxL0SD2S9ruAK6ox9pnuzxoQBBjJgNV2IQA&s'
      }
    ]
  },
  {
    title: 'MAIN COURSE',
    items: [
      {
        name: 'BUTTER CHICKEN',
        description: 'Tender chicken in rich tomato-based curry with cream and aromatic spices',
        price: '₹450',
        image: 'https://thekitchenpaper.com/wp-content/uploads/2018/01/indian-butter-chicken-recipe-1-400x600.jpg'
      },
      {
        name: 'BIRYANI',
        description: 'Fragrant basmati rice layered with marinated lamb and saffron, served with raita',
        price: '₹580',
        image: 'https://rp-media.faasos.io/catalog/images/GYONIQMZX7G6.png'
      },
      {
        name: 'PANEER MAKHANI',
        description: 'Cottage cheese cubes in creamy tomato gravy with butter and fresh herbs',
        price: '₹380',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhyqWtFCCeh-x5jSRhvjQVXUrDRrcy0HSxA&s'
      },
      {
        name: 'DAL TADKA',
        description: 'Yellow lentils tempered with cumin, garlic, and green chilies, served with basmati rice',
        price: '₹320',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNpw_GD-u0HPFNo30beLlEENfybNYPk2vJA&s'
      }
    ]
  },
  {
    title: 'DESSERTS',
    items: [
      {
        name: 'GULAB JAMUN',
        description: 'Soft milk dumplings soaked in cardamom-scented sugar syrup',
        price: '₹100',
        image: 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1'
      },
      {
        name: 'RAS MALAI',
        description: 'Delicate cottage cheese dumplings in sweetened thickened milk with pistachios',
        price: '₹220',
        image: 'https://prashantcorner.com/cdn/shop/files/RasmalaiSR-2.png?v=1720595089&width=1946'
      },
      {
        name: 'KULFI',
        description: 'Traditional Indian ice cream with cardamom, saffron, and chopped nuts',
        price: '₹150',
        image: 'https://recipes.timesofindia.com/thumb/84786580.cms?width=1200&height=900'
      }
    ]
  },
  {
    title: 'DRINKS',
    items: [
      {
        name: 'Mango Lassi',
        description: 'Creamy yogurt drink blended with fresh mango pulp and cardamom',
        price: '₹120',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-sev2X9F_nY6fbZcQygshfuwJui1ILkKHJg&s'
      },
      {
        name: 'MASALA CHAI',
        description: 'Traditional spiced tea with cardamom, cinnamon, ginger, and fresh milk',
        price: '₹80',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80'
      },
      {
        name: 'FRESH LIME SODA',
        description: 'Refreshing drink with fresh lime juice, soda water, and a hint of mint',
        price: '₹100',
        image: 'https://rajasthanimisthanbhandar.com/wp-content/uploads/2024/09/1.webp'
      }
    ]
  }
]

export function Menu() {
  return (
    <section id="menu" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            OUR MENU
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each dish is crafted with precision and passion, using only the finest ingredients
          </p>
        </motion.div>

        <div className="space-y-20">
          {menuCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl md:text-3xl tracking-wide mb-12 text-center">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                    className="group"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="sm:w-32 sm:h-32 w-full h-48 overflow-hidden rounded-lg">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg tracking-wide">
                            {item.name}
                          </h4>
                          <span className="text-lg ml-4">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}