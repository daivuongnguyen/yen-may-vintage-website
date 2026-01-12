// =====================================================
// 🎨 YEN MAY VINTAGE - CONFIGURATION FILE
// =====================================================
// Edit this file to update all text and images on the website.
// After making changes, just refresh the page to see updates!
// =====================================================

window.CONFIG = {
    // ─────────────────────────────────────────────────────
    // 📌 BRAND INFORMATION
    // ─────────────────────────────────────────────────────
    brand: {
        name: "Yen May",
        tagline: "VINTAGE",
        established: "Est. 2024 • Da Nang",
        instagramHandle: "@yenmayvintage",
        instagramUrl: "https://instagram.com/yenmayvintage",
        slogan: "We do the hard work, so you can enjoy the fashion.",
        copyright: "© 2024 Yen May Vintage. All rights reserved."
    },

    // ─────────────────────────────────────────────────────
    // 🔔 URGENCY BANNER (Top of page)
    // ─────────────────────────────────────────────────────
    urgencyBanner: {
        enabled: true,
        message: "Open Today: 10:00 - 21:00",
        ctaText: "Visit Now",
        ctaLink: "https://www.google.com/maps/dir/?api=1&destination=45/3+An+Hai+Dong+1,+Son+Tra,+Da+Nang"
    },

    // ─────────────────────────────────────────────────────
    // 🏠 HERO SECTION (Main Banner)
    // ─────────────────────────────────────────────────────
    hero: {
        headingLine1: "Fashion Curators,",
        headingLine2: "Not Just Sellers.",
        description: "We do the hard work of hunting, treating, and styling so you can effortlessly enjoy the art of global vintage fashion.",
        buttonText: "Visit Our Store in Da Nang",
        backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2QLZhb87tbX4BKLW9RzPlZk8OSH_CKtFEjH9dMG3eUlk5Yr0cuDnmRZmkuapa5WtjKlnEkBBi4SequhJEYyeIjT2Rw7Hwael1lxwOqNq6k2dC6K4FJ5NZ438UIWInHOZ3M8J9AobLlVLB1ffb0q0i3LZVctsKPYcOal6KBVomR4g_WQDUre6L2a9zGaM6tbFoF1tvkTagp3v6hzXEWypHAosW_Xb4ThmXlWLNCWMDOJDkyokQv6B7oN0iOp7yIWsWbb0M4Dr2O-U",

        // 🎯 NEW DROP COUNTDOWN (Set enabled to false to disable)
        countdown: {
            enabled: false,
            targetDate: "2026-01-20T10:00:00+07:00", // ISO 8601 format (Da Nang timezone)
            title: "New Drop Arriving",
            expiredMessage: "New Collection Now Available!"
        }
    },

    // ─────────────────────────────────────────────────────
    // 💎 BRAND HEART SECTION (Philosophy)
    // ─────────────────────────────────────────────────────
    brandHeart: {
        sectionLabel: "The Philosophy",
        headingLine1: "Hand-picked.",
        headingLine2: "Hand-treated.",
        headingLine3: "One-of-a-kind.",
        description: "Yen May is a collection, not a warehouse. We scour international markets for branded Vintage and Y2K pieces that tell a story.",
        featureImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKNNOm2fspgKBWVrjCIuCiME3vI_k_GcFK01-4tvu_ybcMZJKDJNLJUy04aIOf70qGJLLcE15U_PnQU1N-PkodBtYjj0KL11DKKf4HdSY_slQQi4JwfZbwgede7N5jRoe84h1e9ODAPR03WqsGZeL7CMllLAepU18n9562ytQ7KQOUfQY574fYzufAUY9W3WwhWJe1qg4W59NoA4yABpNAsGNTbq82N6EYVaQHZ_g0JXRA2sWixnSxF8qnw9seo5oH9pxfed78ZwI",
        featureImageAlt: "Close up of vintage fabric texture and buttons",
        features: [
            {
                icon: "diamond",
                title: "Curated Selection",
                description: "Strictly no bulk bales. Every single item is chosen for its unique character and quality."
            },
            {
                icon: "dry_cleaning",
                title: "Professionally Treated",
                description: "Washed, steamed, and mended. Ready to wear the moment it arrives at your door."
            }
        ]
    },

    // ─────────────────────────────────────────────────────
    // 👗 GALLERY SECTION (Products)
    // ─────────────────────────────────────────────────────
    gallery: {
        sectionLabel: "The Collection",
        headingLine1: "Gems of",
        headingLine2: "The Week",
        description: "We are not a standard e-commerce store. Think of this as a gallery. See something you love?",
        ctaText: "DM to Reserve",
        viewMoreText: "Visit Shop to See All",

        // 📸 PRODUCT ITEMS - Edit these to update your collection!
        items: [
            {
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClneMtQMb2kqrHx-SLOiyvqouorQ0dxgNmAQO5xIKtxVSPQN_gDNrGGVeEfUi-1FDd3NDLKAz5oXd04RlDsXK9idxpl_1g_iIwwTvLPge9mxJv_z8USOaZ3sVgAz9IZVY94dwjRY9JPre8wFARoE1WlKuZ5KZAPCFL_i26miJSQG4FPH8MUSkqRghgJSS_co-o5NZiE8B9wuoRRsbaMDsee4tiHrKCR0zA0k41YdV47YS7p8VBWfYYOIW0UK33hEaW7jzubrMKT-Q",
                imageAlt: "Vintage silk floral dress",
                title: "Silk Floral Midi",
                status: "Available",
                size: "Size M",
                badge: "NEW DROP" // Options: null, "RARE FIND", "NEW", "SALE", etc.
            },
            {
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzTIZ6o9VL3BvfiMV7ZKB7LE1n-gTde201O4XTzHKRqg_Ic7u2m5soVrnQKgCxGx4LXRSokJYFR7xgJCVaJ8ElgXkFG_DDci4rh4a0xpjsI0HsvPG6bJqmSrUGUtpkjhV0bJ53T1neHkA6jbB74ZkmTIj-SBkBt5toj0K05FFjcnZMHw1idteSWNP28ktH2UL4WtDPATLMRkj1n-9GFiAsRuwB-CEgPP6qK-F6gWzfbV_BvUcVlIDR5oSuSTo2FZZN4zk3DGCMMgU",
                imageAlt: "Vintage distressed leather jacket",
                title: "90s Biker Jacket",
                status: "Reserved",
                size: "Size L",
                badge: null
            },
            {
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6wLP57hmZ3FHT4i20Ic2UkOY4D01857tXcwmfk-wIEwvYyi78gUnwCUa1_wUgz575UfYhJNK1u8zFx6CbHFUfpF6UfZQ45EKR_-NIXBmCMRAjZDR8nlKPiZ3O6d2LlpJoTxyls33nV8WOPIDULeJDZjsneeUuYJngvu5Q-KdGvm9R_AGp2gjNqCGwuu8TXzcO4Uc7ZlJd2ONrEJ_9cK3tJ6c-ck7GEgVm4DTzKdkUI7LQETuGFog_ZcszAem5TAcShZ0UDedwDyc",
                imageAlt: "Retro colorful knit sweater",
                title: "Coogi Style Knit",
                status: "Available",
                size: "Size XL",
                badge: "RARE FIND"
            },
            {
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzTIZ6o9VL3BvfiMV7ZKB7LE1n-gTde201O4XTzHKRqg_Ic7u2m5soVrnQKgCxGx4LXRSokJYFR7xgJCVaJ8ElgXkFG_DDci4rh4a0xpjsI0HsvPG6bJqmSrUGUtpkjhV0bJ53T1neHkA6jbB74ZkmTIj-SBkBt5toj0K05FFjcnZMHw1idteSWNP28ktH2UL4WtDPATLMRkj1n-9GFiAsRuwB-CEgPP6qK-F6gWzfbV_BvUcVlIDR5oSuSTo2FZZN4zk3DGCMMgU",
                imageAlt: "Vintage distressed denim vest",
                title: "Distressed Denim",
                status: "Sold Out",
                size: "Size M",
                badge: null
            },
            {
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClneMtQMb2kqrHx-SLOiyvqouorQ0dxgNmAQO5xIKtxVSPQN_gDNrGGVeEfUi-1FDd3NDLKAz5oXd04RlDsXK9idxpl_1g_iIwwTvLPge9mxJv_z8USOaZ3sVgAz9IZVY94dwjRY9JPre8wFARoE1WlKuZ5KZAPCFL_i26miJSQG4FPH8MUSkqRghgJSS_co-o5NZiE8B9wuoRRsbaMDsee4tiHrKCR0zA0k41YdV47YS7p8VBWfYYOIW0UK33hEaW7jzubrMKT-Q",
                imageAlt: "Vintage velvet slip dress",
                title: "Velvet Slip",
                status: "Available",
                size: "Size S",
                badge: null
            },
            {
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6wLP57hmZ3FHT4i20Ic2UkOY4D01857tXcwmfk-wIEwvYyi78gUnwCUa1_wUgz575UfYhJNK1u8zFx6CbHFUfpF6UfZQ45EKR_-NIXBmCMRAjZDR8nlKPiZ3O6d2LlpJoTxyls33nV8WOPIDULeJDZjsneeUuYJngvu5Q-KdGvm9R_AGp2gjNqCGwuu8TXzcO4Uc7ZlJd2ONrEJ_9cK3tJ6c-ck7GEgVm4DTzKdkUI7LQETuGFog_ZcszAem5TAcShZ0UDedwDyc",
                imageAlt: "Vintage wool cardigan",
                title: "Wool Cardigan",
                status: "Reserved",
                size: "Size L",
                badge: null
            }
        ]
    },

    // ─────────────────────────────────────────────────────
    // 📷 COMMUNITY SECTION (Customer Photos)
    // ─────────────────────────────────────────────────────
    community: {
        sectionLabel: "Community",
        heading: "Spotted at Yen May",
        description: "Join our vintage family. Real smiles, real people, finding their unique story.",
        tagPrompt: "to be featured.",

        // 📸 CUSTOMER PHOTOS - Update these with your customer images!
        photos: [
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPLqNrE2gTTiTkNkditANcIwRkPR3XYCAAMpE7yxxjSQgyk6GtLWeI2-p45VCfkke9rTsldLIyiidBzgvhnH_TISxckdH2OIgsKYE7SfAQkea6UwBJKdj0yWLOYx5wq3waRLfSW7P_5nz2_omI7dRgkiHFWwdEcq0i3BnNCPelQDSvi9BaIgr8h3xRRVBbPt9WtI8maC7qo745x0Ya83dtvL0MMOqp0PdW5TppAPpXfpvFe54OevREWzgvM-xrJ5UvXcmbqjaPnj4", alt: "Happy customer with shopping bag", username: "@thao.nguyen" },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLOO8EvABUCYF7i2s3foN_vGpnTcEYT5NkqqId4TNoLTqtompT-f1hNjDUMEPrjxSoWUvgEexHbJfmkASgg1763l8EvFc1m9WA1CfLcGJRfP59n31Zt4ucCU3P9U_jTrZ1qkZkffghdv4Xb_UHTU9ywBfLgqRDRnHulPZd4nMAgP6LdygIjEbtIGJ6yfZWTurpUuDBwvWZjcHX-Ry5CuFwrn4D5TOu50anLBQC2Oyc6U86y9r-HATDQ8EoEUuITSUuIVoB2ma7heA", alt: "Customer holding bag", username: "@minh_anh_99" },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUaLSHAB91umCghbbNvuo8RaDMLMMmZk7hGLRpJTgk5ANNG10GJ32bOSGQ7m_dC7pvHMVruH5b7tX-twVSbmE-v_9Kof_PPHtx8Sw8aIZG2w341HvdnvgRLf5L5X2tSI-VTbWGLcTp65p5J7VDQUsKWy1ULvStWtqFyWG4NdTpVNin5mQcSmy9AfI_Wxmn4FInvHxSPL1sH0diszC0_IekMwj_N1nmG-R1GmTuOQ5Z5aXpOm5QXyZtkdNEvSqZRCo-q2UWiPWdHkE", alt: "Happy customer in store", username: "@linh.dan" },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQcJLZ3pkypUow1F8rIH2vW7_OK0NTV-wDqYLZFHf-rPxQbJ3CUEEk3m0NY88rYrdQi82z4frCV6foE1Drfg3clDUSbtvx06Vj5LLxFSA0rtIq6RDdGocO3ZzCgwDnuBvXXrhbvlALK-QWJbTDOgDgzV_cRQNqKb1nK87f64cVr0WcSzxapTijB3rFnammUKu3ya_0wyzi8iBDLZVC8MHkzonBlOfFNaNOC0W4ELVdIgeI3B9zk1vbYZXL8BOFjhaAu4aNOtK_lzc", alt: "Customer fitting clothes", username: null },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmBcbHG5dQC3qqu6cZNdVUULnWsx4y_SA9k2IC7avePLu68g8lIF9ZRedl9qEz9PAc7oIg8__QykHVSJzxSJD4Ba7J2of1uQcuOo9LgAWLcMA2JS1vzfcHrauFxtGFE8YBNypcDTw5GW04h78zmcTyOF63PoSJCtFnFdPVSk1lSi0Ew5TugCLTuvjds1Pk1F6hMDYcdqvxMKzp086qKa0ypMHIv3PA2azlg9W2hzgzQ7V3l9klLgL9WbywLSk0imQqxD2zmc0", alt: "Smiling customer with bag", username: null },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOc3aQxXeE4iQAP8PI6WXCxNyM-s8ATYOK3gihenLwMvgZxgiYbymPsXR07pZ-6KyWvEpFDCZYgvxZI9602L3eUHWDK0PzQwyi6VZ4LsnE141_SKsaeGFJ-lFumKL6BJfQw2tzBEj_3EFgmP4-Rt_0UTezoTClIusfAs9C1JX0MIEP7K_QYK_BrsJExvvWqSbBZ6v6K3DAEvAE6lwwCHI12569wTgOBmbVsoLmvhrSFd-gXfP8x2VInYFSD9smDI1iqOqKjk0iBCA", alt: "Customer with purchase", username: null },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQAoTE4RpfZfGc8QLM-2KYJW6v0aOgSWk2lIekXAyz8GDl4Gm8mv8twdRIEb28bR8nMzJirAkg6GDBV6wzVzASsVpQ4VHbLOTAqKoYen9C0dwJWqIsysvCEz-zVWHlt-iB3sz60j9QIkTWt0H8gwfBnZluIQZQ4D75k7MvUDYAT_8Va7sJv6bx2alVgHLM2x_hJiL1y7pBIDxLcXAkQLrljMe3KIwr4lTZe9Umuv8A3cX31TIWUWvnOi2qV_23R2X4_-TeeFd1-MY", alt: "Customer posing", username: "@kim_ngan" },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPmx3CWGs5eAGPcnzhR0OmCsBQuYNMcGxUgWfLFpIQYRsyYlg2DYz9OSfyNN2gzIOQlG-ecWGE4pIpLronrwBybPxfQ-wY_7HJtq9HFiZglMVnXF8jjESmI5Hdjphwm5J4HmLhf7cUUpfLPu6Img0uDgX2pUG8hXb6SolNOQXGiPbhBOxLRPZ7ziyZ9GRS3QCrMC-IBDx-CKuKD-1HtXOaDJYxmc1AOs3NiJV1UNHaP1M0YNtqmSCpSBUvlFXVgVSfsh77YQrNo8k", alt: "Customer smile", username: null },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC8aCaCqZcx79KfB53KCE7WRMXuOUUoyWQgPjMwmn9DFmvQexxBx8x-GRqr_u6A0tByg5YE8ccdwI3s9Ykawfh8bsz1zXXSEvqRUYapWlbOzKCWJyMnyjZPv9S4Ptdxa-x2TEH-5ZWXyAuLZ5gtDzn7EcCD9gvj7EadE7EaoC0tfhoH3B46oEOTUS7oydIbDk1BqNYOQbY3EtIzpqqm1p1fyPsVj_lDXeMD_1mKb2SF89o5wHqQel88ZeducNFxo0amEoLPbgv52k", alt: "Vintage style customer", username: null },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARgGZq1tmGT-MBeSSITTlTF7_W80ZdJ3WooJ1l7WjmQ6fOcLkixsij3mq3LJ2c7DZMUQg1bedQ9KvwDxw1YHv4_tHvI90w_o-pfMZKQLBCTBJVBSgAjSulpCEI8PNG1cdewfNUOklAwjTLs7qRTXu5YzwHVYLCF8ZcAqGPD_pqqj65LSeV3LfgjzTSUOO-ZwDxjsiyJjxqtaVbnYa7qMeA5fli3OFvQnKN2cumIGaYIW0VPvePjWl5nqfLeBMK636zz9nT2f5cjk4", alt: "Happy shopper", username: null },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFoc-GzSS_90MUXNwWyjvWnKDazbhZSUZX3oX9GGbZxrwAh8-CSAdHiNX0l0BIqeo6BWkNbgLoqDDZS-G80BePRs0EBNxwibXXsHWHcehfvaooEzQW035nKrDiBvv2-oiqmdmqV_5XQz80m2pbJRdMU6_kiR8ApBraBUTsF_ZvJ8nsFz5gBSTlqoOblYJQNXy7kUWKV7baZklxXIFhgc47IxlYp_P7B4GSxzXfoVylRmRR86S2Zjz-KTdwkQCPhUdOHNJ-5aa4gUo", alt: "Customer portrait", username: null },
            { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhQxtgh7X5vIsndPb8vM2YfeXxkTiqqTWV-yEx5o4pn-M7w_gT-GXkYYYlejdlWEjUlWzwS_1bD-Ik5sYUgZOnbxkrpeEZGlxrWpP2cVb9i8CgaMFjzO8Q-7UsRLqkbfPjxSlzLG6eDeY49YVdQ6ZdcI3-lLC4cn8QiwvotuIxkeYMion1xv3Z-viOcowJLjN-Bedb28oGaQGgWoykRp6BrZcb5kTMyAkurTdIaRpn9pKhfDlKzT4gg6aJVKGCr5aCa8B6J15Z5Uk", alt: "Customer in mirror", username: null }
        ]
    },

    // ─────────────────────────────────────────────────────
    // ⭐ PRESTIGE SECTION (Reviews & Press)
    // ─────────────────────────────────────────────────────
    prestige: {
        heading: "As Featured In",

        // 📰 PRESS FEATURES - Add real press articles here
        pressItems: [
            {
                publication: "Da Nang Newspaper",
                articleTitle: "The Vintage Revival: How One Store is Changing Fashion in Da Nang",
                articleUrl: "#", // Add real URL here
                logo: null // Optional: Add logo image URL
            },
            {
                publication: "Quang Nam News",
                articleTitle: "Sustainable Style: Meet the Curators Behind Yen May Vintage",
                articleUrl: "#", // Add real URL here
                logo: null
            },
            {
                publication: "Style Magazine",
                articleTitle: "Top 5 Vintage Stores in Central Vietnam",
                articleUrl: "#", // Add real URL here
                logo: null
            }
        ],

        // 📸 REVIEW SCREENSHOTS - Google Maps review images (9:16 ratio)
        reviewScreenshots: [
            {
                image: "https://via.placeholder.com/400x711/f5f5f5/666666?text=Google+Review+1",
                sourceUrl: "" // Add Google Maps review link here
            },
            {
                image: "https://via.placeholder.com/400x711/f5f5f5/666666?text=Google+Review+2",
                sourceUrl: ""
            },
            {
                image: "https://via.placeholder.com/400x711/f5f5f5/666666?text=Google+Review+3",
                sourceUrl: ""
            },
            {
                image: "https://via.placeholder.com/400x711/f5f5f5/666666?text=Google+Review+4",
                sourceUrl: ""
            }
        ],

        // 💬 CUSTOMER REVIEWS - Update with real reviews!
        reviews: [
            {
                title: "The Chloe Experience",
                text: "A hidden gem in Da Nang. The curation is impeccable, and the vibe is so chill. It feels less like shopping and more like visiting an art gallery where you can take the art home.",
                authorName: "Sarah Jenkins",
                authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0KU4hH0TQTk7egYaKGZ06cPDUfX34saimQ1iHWfKahVKUg5_jXdCMHFlzov5Lv0E6aSJ5x2JSs_pRaqRIhjkvi__5j8QFWEo9Q8hXpXkbOkHmW-0sE_eZwkUmJB0OWXBfqgU1Xl1cr9TmMaIjpwxyKSx_YsPcDlwFwQmNORjOunTptw1piJmLzdyU-ZOx5icBWn4iqMrp7pJASMCUxh5qDzTVAw9VIMTPIkxRIE0vDTlKm9k40gdhIL6AKv3xBl8I1K17hDVpD-w",
                platform: "Google Review"
            },
            {
                title: "Rare Finds Galore",
                text: "I've been hunting for a specific 90s leather jacket for years. Walked into Yen May and there it was, clean and in perfect condition. Unbelievable luck!",
                authorName: "Minh Thư",
                authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPLqNrE2gTTiTkNkditANcIwRkPR3XYCAAMpE7yxxjSQgyk6GtLWeI2-p45VCfkke9rTsldLIyiidBzgvhnH_TISxckdH2OIgsKYE7SfAQkea6UwBJKdj0yWLOYx5wq3waRLfSW7P_5nz2_omI7dRgkiHFWwdEcq0i3BnNCPelQDSvi9BaIgr8h3xRRVBbPt9WtI8maC7qo745x0Ya83dtvL0MMOqp0PdW5TppAPpXfpvFe54OevREWzgvM-xrJ5UvXcmbqjaPnj4",
                platform: "Facebook"
            },
            {
                title: "Sustainability Win",
                text: "So happy to see a store in VN taking sustainable fashion seriously. No fast fashion junk here, just high quality pieces that have stood the test of time.",
                authorName: "Alex Johnson",
                authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLOO8EvABUCYF7i2s3foN_vGpnTcEYT5NkqqId4TNoLTqtompT-f1hNjDUMEPrjxSoWUvgEexHbJfmkASgg1763l8EvFc1m9WA1CfLcGJRfP59n31Zt4ucCU3P9U_jTrZ1qkZkffghdv4Xb_UHTU9ywBfLgqRDRnHulPZd4nMAgP6LdygIjEbtIGJ6yfZWTurpUuDBwvWZjcHX-Ry5CuFwrn4D5TOu50anLBQC2Oyc6U86y9r-HATDQ8EoEUuITSUuIVoB2ma7heA",
                platform: "TripAdvisor"
            }
        ]
    },

    // ─────────────────────────────────────────────────────
    // 🌿 OASIS SECTION (Store Experience)
    // ─────────────────────────────────────────────────────
    oasis: {
        sectionLabel: "The Experience",
        headingLine1: "A Sanctuary of",
        headingLine2: "Slow Fashion.",
        descriptionParagraph1: "Escape the city noise and drift into a world of curated nostalgia. Our store is designed as a living room for fashion lovers—scented with calming essential oils and soundtracked by warm, crackling vinyl melodies.",
        descriptionParagraph2: "Browse through racks of hand-treated vintage gems at your own rhythm. There's no pressure here, only the invitation to touch, feel, and find the piece that speaks to you. Whether you need styling advice or just a quiet corner to admire the craftsmanship, our oasis is open.",
        ctaText: "Step into Our Oasis",

        images: {
            main: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_0nGy_oOzP7qFAi5f5AwOmzzdirAn7NLzr9cs6xsVHKhnY6ec-8NuN5O4-GnywnVS7IyO9A4wwH5U3RguVmSvXlmFLbRlOk8MCcq8caJ3lXlbRKpdxh3YWf4YZgeYbfJ7dgqZLyqTQGzIKfpJA6b37hpyJ3Yj1CS5UnzaYwkthlgqOrCjwtSfnuxq30yDGQywdoylS2KU10yj0UkQU8VKPx3ITTPVoDWhuLx0ujEN7tb5o8rIr2U_4wd3gQ9Fz8xPRDPxeuM2lgM",
            mainAlt: "Cozy minimalist vintage store interior with plants",
            secondary1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKNNOm2fspgKBWVrjCIuCiME3vI_k_GcFK01-4tvu_ybcMZJKDJNLJUy04aIOf70qGJLLcE15U_PnQU1N-PkodBtYjj0KL11DKKf4HdSY_slQQi4JwfZbwgede7N5jRoe84h1e9ODAPR03WqsGZeL7CMllLAepU18n9562ytQ7KQOUfQY574fYzufAUY9W3WwhWJe1qg4W59NoA4yABpNAsGNTbq82N6EYVaQHZ_g0JXRA2sWixnSxF8qnw9seo5oH9pxfed78ZwI",
            secondary1Alt: "Close up of vintage fabric texture",
            secondary2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUaLSHAB91umCghbbNvuo8RaDMLMMmZk7hGLRpJTgk5ANNG10GJ32bOSGQ7m_dC7pvHMVruH5b7tX-twVSbmE-v_9Kof_PPHtx8Sw8aIZG2w341HvdnvgRLf5L5X2tSI-VTbWGLcTp65p5J7VDQUsKWy1ULvStWtqFyWG4NdTpVNin5mQcSmy9AfI_Wxmn4FInvHxSPL1sH0diszC0_IekMwj_N1nmG-R1GmTuOQ5Z5aXpOm5QXyZtkdNEvSqZRCo-q2UWiPWdHkE",
            secondary2Alt: "Customer enjoying the store atmosphere"
        },

        features: [
            { icon: "graphic_eq", title: "Lo-fi Ambience", description: "Relaxing playlists" },
            { icon: "filter_vintage", title: "Aromatherapy", description: "Natural scents" },
            { icon: "chair", title: "Chill Zone", description: "Comfortable seating" },
            { icon: "checkroom", title: "Try It On", description: "Spacious fitting rooms" }
        ]
    },

    // ─────────────────────────────────────────────────────
    // 📍 LOCATION SECTION
    // ─────────────────────────────────────────────────────
    location: {
        sectionLabel: "Visit Us",
        heading: "Come Find Your Story",
        storeName: "The Hidden Gem",
        storeDescription: "Tucked away in the quiet streets of Son Tra.",
        address: {
            line1: "45/3 An Hai Dong 1 St,",
            line2: "Son Tra, Da Nang",
            full: "45/3 An Hai Dong 1, Son Tra, Da Nang"
        },
        landmark: "Look for the wooden gate",
        hours: "10:00 AM — 9:00 PM",
        hoursNote: "No appointment needed",
        parkingNote: "Free motorbike parking available right in front of the gate.",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.103758369658!2d108.23788231536768!3d16.059882988886673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f2ced6d8b%3A0xeac35f2960ca74a4!2sAn%20H%E1%BA%A3i%20%C4%90%C3%B4ng%201%2C%20S%C6%A1n%20Tr%C3%A0%2C%20Da%20Nang%20550000%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647852392453!5m2!1sen!2s"
    },

    // ─────────────────────────────────────────────────────
    // 📊 DATA SOURCES (Google Sheets) - PRIMARY DATA SOURCE
    // ─────────────────────────────────────────────────────
    googleSheetUrls: {
        products: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-amykTJAn_htc5-zKBMk2qtJfSAzHrosi8uyJcbOxgDMPi5L933wxHaYw8Rb5n-Ds_kllig7yS-Ly/pub?gid=1769349789&single=true&output=tsv",
        community: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-amykTJAn_htc5-zKBMk2qtJfSAzHrosi8uyJcbOxgDMPi5L933wxHaYw8Rb5n-Ds_kllig7yS-Ly/pub?gid=1845061274&single=true&output=tsv"
    },

    // 🚀 SUPABASE CONFIGURATION (DISABLED - Using Google Sheets as primary)
    // ─────────────────────────────────────────────────────
    supabase: {
        url: "", // Disabled
        anonKey: "", // Disabled
        tables: {
            products: 'products',
            community: 'community',
            siteContent: 'site_content',
            siteImages: 'site_images'
        }
    },

    // 🧭 NAVIGATION MENU
    // ─────────────────────────────────────────────────────
    navigation: [
        { label: "Brand Heart", href: "#brand-heart" },
        { label: "Gallery", href: "#gallery" },
        { label: "Prestige", href: "#prestige" },
        { label: "Oasis", href: "#oasis" }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
