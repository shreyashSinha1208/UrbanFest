const data =
          [
                    {
                              name: "Elegant Recliner",
                              img: "https://media.istockphoto.com/id/1148196058/photo/folding-wooden-deckchair-or-beach-chair-mock-up-on-isolated-white-background-3d-illustration.webp?a=1&b=1&s=612x612&w=0&k=20&c=JMWC4s88eWpGX0Khn7bA2nlFXm-H8AaUZbivwLKjkFs=",
                              description: "Sink into luxury with our Elegant Recliner. Perfect for relaxing after a long day. Its plush cushioning and adjustable features ensure unparalleled comfort.",
                              price: 15000,
                              oldPrice: 20000,
                              category: "chair",
                              rating: 3.8
                    },
                    {
                              name: "Sleek Coffee Table",
                              img: "https://media.istockphoto.com/id/457982639/photo/coffee-table-in-modern-living-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=kbU8WAfVNgssSqU4lqMUmIxcfC9ipmUFXeKfflUgZfo=",
                              description: "Upgrade your living space with the Sleek Coffee Table. Its modern design and high-quality finish make it a stunning centerpiece for any room.",
                              price: 8500,
                              oldPrice: 12000,
                              category: "table",
                              rating: 4.1
                    },
                    {
                              name: "Urban Sofa",
                              img: "https://media.istockphoto.com/id/1432859958/photo/cozy-luxury-and-modern-living-room-with-sofa-windows-and-decoration-a-close-up-on-the-sofa.webp?a=1&b=1&s=612x612&w=0&k=20&c=5hyM6kEwDHJ5htCNvlBNKt4DsabnPC_vqAh3PwsbfyU=",
                              description: "The Urban Sofa combines comfort and style with its chic design and cozy seating. Ideal for contemporary homes looking for a touch of sophistication.",
                              price: 25000,
                              oldPrice: 30000,
                              category: "sofa",
                              rating: 4.7
                    },
                    {
                              name: "Elegant Nightstand",
                              img: "https://media.istockphoto.com/id/1795378625/photo/stylish-modern-desk-lamp-books-and-plant-on-white-nightstand-in-bedroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=QBBUvj3JPHvxhAH1Zsdu7qIea0RRezxz1kCWB1qBbFk=",
                              description: "Complete your bedroom with the Elegant Nightstand. Its sophisticated design and ample storage make it a functional and stylish choice for any décor.",
                              price: 7000,
                              oldPrice: 9000,
                              category: "table",
                              rating: 3.9
                    },
                    {
                              name: "Vintage Chair",
                              img: "https://media.istockphoto.com/id/862612400/photo/vintage-wooden-chair-painted-two-tone.webp?a=1&b=1&s=612x612&w=0&k=20&c=D1bHqMy5vVsKXKX3avkqna1UzDTzrdB7jYkBOEnBvSY=",
                              description: "The Vintage Chair offers classic charm with its retro design and comfortable seating. Ideal for adding a touch of nostalgia to any room.",
                              price: 9000,
                              oldPrice: 12000,
                              category: "chair",
                              rating: 4.2
                    },
                    {
                              name: "Modern Desk",
                              img: "https://media.istockphoto.com/id/1319988760/photo/modern-home-office.jpg?s=612x612&w=0&k=20&c=P8hs4uc3KngU3svO9nGw8JISxAL3j0U_cQmrlAMLrO4=",
                              description: "Enhance your workspace with the Modern Desk. Its clean lines and spacious surface make it perfect for both work and study, blending style with function.",
                              price: 13000,
                              oldPrice: 16000,
                              category: "table",
                              rating: 3.6
                    },
                    {
                              name: "Comfort Sofa",
                              img: "https://media.istockphoto.com/id/943910360/photo/posters-in-cozy-apartment-interior.webp?a=1&b=1&s=612x612&w=0&k=20&c=tqG58ClV5mJO9nHewgxGu0YRmLSjq-csFTgof2k76Wk=",
                              description: "Relax in ultimate comfort with the Comfort Sofa. Its deep cushions and soft upholstery create a perfect haven for unwinding at the end of the day.",
                              price: 20000,
                              oldPrice: 25000,
                              category: "sofa",
                              rating: 4.4
                    },
                    {
                              name: "Stylish Stool",
                              img: "https://media.istockphoto.com/id/827667992/photo/studio-shot-of-classic-black-tall-wooden-barstool-standing-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=QB8GQQXKMEthRC6aA4KlufOTdeiZhL1kORZwu4jnWSk=",
                              description: "The Stylish Stool is a versatile addition to your home. With its contemporary design and durable build, it's perfect for extra seating or as a chic accent piece.",
                              price: 5500,
                              oldPrice: 7000,
                              category: "stool",
                              rating: 2.9
                    },
                    {
                              name: "Contemporary Chair",
                              img: "https://media.istockphoto.com/id/827667328/photo/stylish-chair-with-white-top-and-light-wooden-legs-standing-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=LgVJNHNUk-ux4c7orBfR-xkBNZ9ESLtXAnNIG90QX6s=",
                              description: "Add a touch of modern elegance with the Contemporary Chair. Its sleek lines and comfortable design make it a standout piece in any room.",
                              price: 11000,
                              oldPrice: 14000,
                              category: "chair",
                              rating: 4.0
                    },
                    {
                              name: "Luxurious Bed",
                              img: "https://media.istockphoto.com/id/1178809236/photo/cozy-bedroom-in-warm-colors-with-painting-a-nightstand-a-pouf-and-a-plaid.webp?a=1&b=1&s=612x612&w=0&k=20&c=UeKnFf5ljEtLL3kdI8erASdU9aSORD_ejuDbGjs6IaY=",
                              description: "Sleep in style with the Luxurious Bed. Its elegant frame and plush mattress provide the perfect combination of comfort and sophistication.",
                              price: 28000,
                              oldPrice: 35000,
                              category: "sofa",
                              rating: 4.9
                    },
                    {
                              name: "Elegant Desk Chair",
                              img: "https://media.istockphoto.com/id/1284066336/photo/modern-gadgets-in-interior-of-coworking-office-during-covid-19-epidemic.webp?a=1&b=1&s=612x612&w=0&k=20&c=I7LCxZeLbpCvrtBdMD_9sFSDGJu3oStPZ7x3RjLnMzs=",
                              description: "Work in comfort with the Elegant Desk Chair. Its ergonomic design and stylish appearance make it a great addition to any office or home workspace.",
                              price: 14000,
                              oldPrice: 18000,
                              category: "chair",
                              rating: 3.7
                    },
                    {
                              name: "Cozy Bean Bag",
                              img: "https://media.istockphoto.com/id/1891579973/photo/blank-bean-bag-template.webp?a=1&b=1&s=612x612&w=0&k=20&c=3L92Dlg9P1iwWcwhU2lQ128pTsyipf1lpEucPq3LwC8=",
                              description: "Relax in ultimate comfort with the Cozy Bean Bag. Its soft filling and flexible design make it perfect for lounging in any room.",
                              price: 4500,
                              oldPrice: 6000,
                              category: "stool",
                              rating: 4.3
                    },
                    {
                              name: "Rustic Bar Stool",
                              img: "https://media.istockphoto.com/id/1192481411/photo/high-bar-stool-with-wood-seat-and-metal-legs-on-an-isolated-background-3d-rendering.jpg?s=612x612&w=0&k=20&c=L2tT7wVw9sFB23pB6DT4b8i38qU5hH-rZ46DzHQT6tk=",
                              description: "The Rustic Bar Stool brings a touch of countryside charm to your bar area. Its sturdy construction and classic design make it both functional and stylish.",
                              price: 7500,
                              oldPrice: 9500,
                              category: "stool",
                              rating: 4.6
                    },
                    {
                              name: "Art Deco Chair",
                              img: "https://media.istockphoto.com/id/157559211/photo/three-vintage-chairs.webp?a=1&b=1&s=612x612&w=0&k=20&c=92Adwg8ROm_RQ9szg-4wFxGqa6K-X9uEYK5Re7KTw-I=",
                              description: "Elevate your décor with the Art Deco Chair. Its bold design and luxurious materials add a touch of glamour to any space.",
                              price: 15000,
                              oldPrice: 18000,
                              category: "chair",
                              rating: 4.7
                    },
                    {
                              name: "Minimalist Table",
                              img: "https://media.istockphoto.com/id/1177844431/photo/scandinavian-style-modern-home-office-interior.jpg?s=612x612&w=0&k=20&c=LU3Qp7kxDbi4xkH6eM9LegzJoSFa6rK4y26jsl1grHM=",
                              description: "The Minimalist Table features a sleek and simple design that complements any modern interior. Perfect for dining or as a stylish workspace.",
                              price: 12000,
                              oldPrice: 14000,
                              category: "table",
                              rating: 4.4
                    },
                    {
                              name: "Scandinavian Sofa",
                              img: "https://media.istockphoto.com/id/1291649034/photo/modern-home-interior-mock-up-with-dark-blue-sofa-table-and-decor-in-living-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=7e-cfhKkeVpv9-Ri0zcW_oV-A0sOznl1cScxRoWHV7k=",
                              description: "The Scandinavian Sofa combines functionality with minimalist design. Its clean lines and comfortable cushions make it a versatile addition to any living area.",
                              price: 23000,
                              oldPrice: 28000,
                              category: "sofa",
                              rating: 4.8
                    },
                    {
                              name: "Vintage Console",
                              img: "https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.webp?a=1&b=1&s=612x612&w=0&k=20&c=tveHEYjYCdI8dBBot1fwJ8-10PpczfLDiAaKPh3Ia4A=",
                              description: "Add a touch of vintage charm with the Vintage Console. Its classic design and ample storage make it a practical and stylish choice for your entryway.",
                              price: 10000,
                              oldPrice: 12500,
                              category: "table",
                              rating: 4.5
                    },
                    {
                              name: "Urban Lounge Chair",
                              img: "https://media.istockphoto.com/id/1220122049/photo/interior-composition-with-a-soft-armchair-a-table-and-a-golden-lamp.jpg?s=612x612&w=0&k=20&c=6BbaGwJBa1dKX7BNmBQ-4oOgjiV3nFhCc1ueicgR80Q=",
                              description: "The Urban Lounge Chair offers a blend of style and comfort. Its modern design and plush cushions make it a perfect spot for relaxation.",
                              price: 16000,
                              oldPrice: 20000,
                              category: "chair",
                              rating: 4.7
                    },
                    {
                              name: "Rustic Ottoman",
                              img: "https://media.istockphoto.com/id/1691913372/photo/dining-side-chair-set-side-view-front-view-furniture-3d-rendering-isolate-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=MlTsY1wGtXLdcQlgfTQKG_X3Qcd3LM0-PEhnM1TrYl8=",
                              description: "Enhance your living space with the Rustic Ottoman. Its durable construction and charming design make it a versatile piece for any room.",
                              price: 6000,
                              oldPrice: 8000,
                              category: "stool",
                              rating: 1.3
                    },
                    {
                              name: "Luxury Daybed",
                              img: "https://media.istockphoto.com/id/1488798700/photo/elegant-vintage-white-leather-black-silver-wood-carved-day-bed-sofa-on-gray-high-pile-shag.webp?a=1&b=1&s=612x612&w=0&k=20&c=YPhDNFeTstGHILcmyPEDdSP96gi7y8tqXpj6xPua49o=",
                              description: "The Luxury Daybed combines comfort with elegance. Perfect for lounging or as a stylish guest bed, its plush upholstery ensures a restful experience.",
                              price: 25000,
                              oldPrice: 30000,
                              category: "sofa",
                              rating: 2.8
                    },
                    {
                              name: "Retro Dining Chair",
                              img: "https://media.istockphoto.com/id/1215325829/photo/stylish-yellow-chair-at-wooden-dining-table-in-trendy-interior.webp?a=1&b=1&s=612x612&w=0&k=20&c=gKnFQ7GR65RfCGMjoUTmUOBETuTA4Xyoy8o_YcUnqyY=",
                              description: "Bring a touch of retro style to your dining area with the Retro Dining Chair. Its unique design and comfortable seat make it a standout addition.",
                              price: 9500,
                              oldPrice: 12000,
                              category: "chair",
                              rating: 3.4
                    },
                    {
                              name: "Modern Side Table",
                              img: "https://media.istockphoto.com/id/1368342833/photo/end-table-round-coffee-table-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=mQIzD45Vaw2xHSvHNvbJQuYJfdZZ4fiAsliy7BQv6Zc=",
                              description: "The Modern Side Table features a sleek design and functional storage. Its contemporary look fits seamlessly into any modern décor.",
                              price: 8000,
                              oldPrice: 10000,
                              category: "table",
                              rating: 4.8
                    },
                    {
                              name: "Elegant Ottoman",
                              img: "https://media.istockphoto.com/id/1442077270/photo/modern-and-minimal-round-white-granite-pedestal-table-podium-with-sunlight-and-shadow-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=v6G1l_C6JLm-y9iqfEMPErArHJw_nR15FxCWpfv9AxQ=",
                              description: "Add a touch of elegance with the Elegant Ottoman. Its sophisticated design and plush cushioning make it a luxurious addition to any room.",
                              price: 7500,
                              oldPrice: 9500,
                              category: "stool",
                              rating: 1.6
                    },
                    {
                              name: "Chic Sofa Bed",
                              img: "https://media.istockphoto.com/id/1856387503/photo/pillow-cushion-on-sofa-beautiful-cotton-cushion-with-look-of-sofa-and-other-sitting.webp?a=1&b=1&s=612x612&w=0&k=20&c=LnzhFj43ZUQvSFev4_aspyDP_Zc9agr3GxltGke9LVQ=",
                              description: "The Chic Sofa Bed offers both style and functionality. Easily convert it from a sofa to a bed for guests, while its sleek design enhances any room.",
                              price: 22000,
                              oldPrice: 26000,
                              category: "sofa",
                              rating: 4.5
                    },
                    {
                              name: "Contemporary Stool",
                              img: "https://media.istockphoto.com/id/1145380520/photo/brown-grey-furniture-sun-pan-highland-dining-chair-antique-brass-dark-grey-fabric-bar-stool.jpg?s=612x612&w=0&k=20&c=-z8LfLE3AFTy4cSxUtb6soTcAnbXQJVjnaIk-2hslP8=",
                              description: "The Contemporary Bar Stool features a modern design and adjustable height. Its sleek look and comfortable seat make it perfect for any bar or counter area.",
                              price: 7000,
                              oldPrice: 9000,
                              category: "stool",
                              rating: 4.4
                    },
                    {
                              name: "Rustic Coffee Table",
                              img: "https://media.istockphoto.com/id/1475986296/photo/interior-coffee-table.jpg?s=612x612&w=0&k=20&c=3JcaIkDxv-AwjT4Rw1c5T34QD4w2QUiJ21KZ9qSW08w=",
                              description: "The Rustic Coffee Table adds warmth to your living room with its natural wood finish and classic design. A perfect piece for cozying up your space.",
                              price: 10000,
                              oldPrice: 12000,
                              category: "table",
                              rating: 3.5
                    },
                    {
                              name: "Luxury Recliner",
                              img: "https://media.istockphoto.com/id/1424803291/photo/close-up-view-of-reclining-chair-in-living-room.jpg?s=612x612&w=0&k=20&c=M5Uqp6VBJAePbkuPciflEL6yxVgLYmzS2pl_0JLx1No=",
                              description: "Experience ultimate relaxation with the Luxury Recliner. Its plush seating and advanced reclining features make it an ideal choice for unwinding in style.",
                              price: 18000,
                              oldPrice: 22000,
                              category: "chair",
                              rating: 2.3
                    },
                    {
                              name: "Minimalist Desk",
                              img: "https://media.istockphoto.com/id/1011962804/photo/desktop-computer-mock-up-on-an-industrial-desk-in-a-scandinavian-student-bedroom-interior.jpg?s=612x612&w=0&k=20&c=fRRPPQ45j6nL6KMDDOItbXiaundhgLOOsbETmX6Y59E=",
                              description: "The Minimalist Desk offers a sleek, modern look with ample workspace. Its clean lines and understated design make it a perfect fit for any home office.",
                              price: 11500,
                              oldPrice: 14000,
                              category: "table",
                              rating: 4.4
                    },
                    {
                              name: "Vintage Armchair",
                              img: "https://media.istockphoto.com/id/1321320075/photo/3d-rendering-of-an-isolated-modern-pale-green-mid-century-cosy-lounge-wingback-armchair.jpg?s=612x612&w=0&k=20&c=ziAdbDP5iUEQ1OZinRyBt5Wy8LvRtcKz9OLU22V2jgs=",
                              description: "Relax in style with the Vintage Armchair. Its classic design and luxurious upholstery offer both comfort and timeless appeal.",
                              price: 13000,
                              oldPrice: 16000,
                              category: "chair",
                              rating: 4.5
                    },
                    {
                              name: "Modern Lounge Sofa",
                              img: "https://media.istockphoto.com/id/1133601992/photo/yellow-living-room-with-sofa.jpg?s=612x612&w=0&k=20&c=Yvb45d_9X7lVTPvSaniDfNp3Xkz9U7auXxjIzX9CA0o=",
                              description: "Transform your living area with the Modern Lounge Sofa. Its sleek design and deep cushions create a comfortable and stylish environment for any gathering.",
                              price: 24000,
                              oldPrice: 30000,
                              category: "sofa",
                              rating: 3.9
                    },
                    {
                              name: "Scandinavian Stool",
                              img: "https://media.istockphoto.com/id/1341392179/photo/modern-office-space-kitchen-interior.jpg?s=612x612&w=0&k=20&c=vNC_owdnKVKncwxue30NL7cMKqJZBgukdPMhhW8wQgA=",
                              description: "The Scandinavian Stool combines simplicity with functionality. Its clean design and sturdy construction make it a versatile piece for any modern home.",
                              price: 5000,
                              oldPrice: 6500,
                              category: "stool",
                              rating: 3.8
                    },
                    {
                              name: "Chic Coffee Table",
                              img: "https://media.istockphoto.com/id/1963191732/photo/realistic-3d-round-coffee-or-tea-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=j_JCD6dGxDsvwpjAM6enxWACRIBvsQBBqvxo8nn_dDo=",
                              description: "Elevate your living space with the Chic Coffee Table. Its modern design and sleek finish make it a stylish centerpiece for your room.",
                              price: 9000,
                              oldPrice: 11000,
                              category: "table",
                              rating: 1.3
                    },
                    {
                              name: "Cozy Recliner",
                              img: "https://media.istockphoto.com/id/136382413/photo/tv-chair-in-the-living-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=tKG3XlphC5waepEJsV67yVYtYT9oTbbokmNGBNpikZE=",
                              description: "Unwind in comfort with the Cozy Recliner. Its plush seating and smooth reclining mechanism ensure a relaxing experience after a long day.",
                              price: 17000,
                              oldPrice: 20000,
                              category: "chair",
                              rating: 3.6
                    },
                    {
                              name: "Luxurious Armchair",
                              img: "https://media.istockphoto.com/id/1013671450/photo/sofa-of-black-leather-standing-in-center-on-concrete-floor-against-dark-grey-wall-with-copy.webp?a=1&b=1&s=612x612&w=0&k=20&c=7IiChcj6lGolryPNLYzmFEBuJvATaKXhC58L-AbxEtc=",
                              description: "The Luxurious Armchair adds a touch of elegance to any room. Its sumptuous upholstery and classic design provide both comfort and style.",
                              price: 14000,
                              oldPrice: 18000,
                              category: "chair",
                              rating: 2.9
                    },
                    {
                              name: "Modern Coffee Table",
                              img: "https://media.istockphoto.com/id/1428594094/photo/empty-coffee-shop-interior-with-wooden-tables-coffee-maker-pastries-and-pendant-lights.jpg?s=612x612&w=0&k=20&c=dMqeYCJDs3BeBP_jv93qHRISDt-54895SPoVc6_oJt4=",
                              description: "The Modern Coffee Table features a sleek design with a spacious surface. Perfect for modern living rooms, it combines style and functionality.",
                              price: 11000,
                              oldPrice: 14000,
                              category: "table",
                              rating: 3.8
                    },
                    {
                              name: "Rustic Side Table",
                              img: "https://media.istockphoto.com/id/1411619454/photo/end-table-round-coffee-table-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=N4Pb1HjLB6L0X0cW5uYfixHwASHZ8uLF8qjivo0qbaQ=",
                              description: "Add charm to your room with the Rustic Side Table. Its natural wood finish and sturdy build make it a versatile and stylish addition to any space.",
                              price: 9500,
                              oldPrice: 12000,
                              category: "table",
                              rating: 2.7
                    },
                    {
                              name: "Vintage Lounge Chair",
                              img: "https://media.istockphoto.com/id/1148196058/photo/folding-wooden-deckchair-or-beach-chair-mock-up-on-isolated-white-background-3d-illustration.webp?a=1&b=1&s=612x612&w=0&k=20&c=JMWC4s88eWpGX0Khn7bA2nlFXm-H8AaUZbivwLKjkFs=",
                              description: "Relax in style with the Vintage Lounge Chair. Its retro design and comfortable seating make it a standout piece for any room.",
                              price: 14000,
                              oldPrice: 18000,
                              category: "chair",
                              rating: 4.6
                    },
                    {
                              name: "Contemporary Desk",
                              img: "https://plus.unsplash.com/premium_photo-1724788724847-6d5da3271b80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29udGVtcHJhcnklMjBkZXNrfGVufDB8fDB8fHww",
                              description: "The Contemporary Desk offers a modern design with ample workspace. Its clean lines and stylish finish make it a great addition to any office or study.",
                              price: 12000,
                              oldPrice: 15000,
                              category: "table",
                              rating: 4.9
                    },
                    {
                              name: "Industrial Bar Stool",
                              img: "https://media.istockphoto.com/id/1145393402/photo/woodlands-bar-stool-with-white-background-henriksdal-bar-stool-with-backrest-bar-stool-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=CmZfVf1Pe0LLuoC8cajgNtIR0bmyETCjj9PwgNUBzDI=",
                              description: "The Industrial Bar Stool features a rugged design with adjustable height. Its industrial look and durable construction make it perfect for any bar or kitchen area.",
                              price: 6500,
                              oldPrice: 8000,
                              category: "stool",
                              rating: 3.7
                    },
                    {
                              name: "Classic Armchair",
                              img: "https://media.istockphoto.com/id/483140662/photo/vintage-red-armchair.webp?a=1&b=1&s=612x612&w=0&k=20&c=pIWQzY6JATKyL59tnuCmsImBKFtvOgZPQV2bmDGtKG0=",
                              description: "Enjoy timeless comfort with the Classic Armchair. Its elegant design and plush upholstery make it a perfect choice for any traditional setting.",
                              price: 15000,
                              oldPrice: 19000,
                              category: "chair",
                              rating: 2.3
                    },

          ];

export default data;
