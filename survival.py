from flask import Blueprint, request, jsonify
import json
import random

survival_bp = Blueprint('survival', __name__)

# List of random songs for variety
RANDOM_SONGS = [
    "Bohemian Rhapsody", "Don't Stop Believin'", "Sweet Caroline", "Mr. Brightside",
    "Dancing Queen", "I Want It That Way", "Livin' on a Prayer", "Sweet Child O' Mine",
    "Hotel California", "Billie Jean", "Imagine", "Wonderwall", "Hey Jude", "Smells Like Teen Spirit",
    "Thriller", "Like a Rolling Stone", "Stairway to Heaven", "What's Up?", "I Will Survive",
    "Eye of the Tiger", "We Will Rock You", "Don't Stop Me Now", "Radioactive", "Uptown Funk",
    "Shape of You", "Blinding Lights", "Bad Guy", "Old Town Road", "Despacito", "Gangnam Style"
]

# Fallback responses for different zodiac signs
ZODIAC_RESPONSES = {
    "Aries": {
        "personality": "brave, energetic, and natural leader",
        "food": "high-protein energy bars and spicy foods",
        "foodReason": "to fuel your warrior spirit and maintain your competitive edge during the invasion",
        "weapon": "plasma sword with dual-wielding capability",
        "clothing": "lightweight armor with flame-resistant properties"
    },
    "Taurus": {
        "personality": "reliable, practical, and incredibly stubborn",
        "food": "comfort foods and chocolate-based survival rations",
        "foodReason": "to keep you grounded and maintain your legendary patience under alien pressure",
        "weapon": "heavy-duty energy shield with built-in battering ram",
        "clothing": "earth-toned tactical gear with maximum durability"
    },
    "Gemini": {
        "personality": "adaptable, communicative, and quick-thinking",
        "food": "variety packs of different flavored nutrients",
        "foodReason": "to keep your versatile mind sharp and ready for any alien negotiation",
        "weapon": "dual energy pistols with communication jammers",
        "clothing": "color-changing camouflage suit with multiple pockets"
    },
    "Cancer": {
        "personality": "protective, intuitive, and emotionally intelligent",
        "food": "home-style comfort foods and healing herbs",
        "foodReason": "to nurture your protective instincts and maintain emotional balance",
        "weapon": "defensive energy dome generator",
        "clothing": "protective family-crest armor with emotional shielding"
    },
    "Leo": {
        "personality": "dramatic, charismatic, and naturally commanding",
        "food": "gourmet survival meals with golden supplements",
        "foodReason": "to maintain your royal presence and dazzling charisma",
        "weapon": "golden energy scepter with blinding light attacks",
        "clothing": "majestic battle robes with built-in spotlight effects"
    },
    "Virgo": {
        "personality": "perfectionist, analytical, and incredibly organized",
        "food": "precisely measured organic nutrition cubes",
        "foodReason": "to maintain your systematic approach to alien invasion survival",
        "weapon": "precision laser rifle with targeting computer",
        "clothing": "perfectly fitted tactical uniform with organizational pouches"
    },
    "Libra": {
        "personality": "balanced, diplomatic, and harmony-seeking",
        "food": "aesthetically pleasing balanced meals",
        "foodReason": "to maintain your inner peace and diplomatic charm",
        "weapon": "harmony-inducing sonic weapon",
        "clothing": "elegantly balanced armor in pleasing color combinations"
    },
    "Scorpio": {
        "personality": "intense, mysterious, and powerfully determined",
        "food": "dark chocolate and intense flavor concentrates",
        "foodReason": "to channel your mysterious energy and maintain your intimidating aura",
        "weapon": "stealth energy daggers with poison effects",
        "clothing": "dark, form-fitting armor with mysterious glowing accents"
    },
    "Sagittarius": {
        "personality": "adventurous, optimistic, and freedom-loving",
        "food": "international cuisine survival packs",
        "foodReason": "to fuel your adventurous spirit and wanderlust",
        "weapon": "long-range energy bow with explosive arrows",
        "clothing": "explorer gear with built-in navigation systems"
    },
    "Capricorn": {
        "personality": "ambitious, disciplined, and naturally authoritative",
        "food": "traditional, substantial meals with leadership vitamins",
        "foodReason": "to maintain your commanding presence and strategic thinking",
        "weapon": "command staff with tactical coordination abilities",
        "clothing": "formal military-style armor with rank insignia"
    },
    "Aquarius": {
        "personality": "innovative, rebellious, and futuristically minded",
        "food": "experimental future-foods and tech-enhanced nutrients",
        "foodReason": "to power your revolutionary thinking and technological superiority",
        "weapon": "advanced alien-tech reverse-engineered gadgets",
        "clothing": "futuristic armor with LED displays and tech interfaces"
    },
    "Pisces": {
        "personality": "intuitive, empathetic, and spiritually connected",
        "food": "seafood-based nutrients and calming herbal blends",
        "foodReason": "to maintain your spiritual connection and empathetic abilities",
        "weapon": "water-based energy trident with healing properties",
        "clothing": "flowing, water-resistant robes with mystical symbols"
    }
}

@survival_bp.route('/generate-advice', methods=['POST'])
def generate_survival_advice():
    try:
        data = request.get_json()
        
        # Extract user data
        nickname = data.get('nickname')
        birthdate = data.get('birthdate')
        birthplace = data.get('birthplace')
        favorite_color = data.get('favoriteColor')
        zodiac_sign = data.get('zodiacSign')
        zodiac_traits = data.get('zodiacTraits', [])
        
        # Select a random song
        random_song = random.choice(RANDOM_SONGS)
        
        # Get zodiac-specific response
        zodiac_response = ZODIAC_RESPONSES.get(zodiac_sign, ZODIAC_RESPONSES["Aries"])
        
        # Create personalized response incorporating favorite color
        advice_data = {
            "personality": zodiac_response["personality"],
            "food": f"{zodiac_response['food']} in {favorite_color} packaging",
            "foodReason": zodiac_response["foodReason"],
            "weapon": f"{zodiac_response['weapon']} with {favorite_color} energy effects",
            "clothing": f"{zodiac_response['clothing']} with {favorite_color} accents",
            "song": random_song,
            "songReason": f"This song will create a {favorite_color} aura of confusion around you, making the aliens think you're a mystical Earth deity they shouldn't mess with!"
        }
        
        # Return the complete response
        return jsonify({
            "success": True,
            "advice": {
                "nickname": nickname,
                "birthplace": birthplace,
                "favoriteColor": favorite_color,
                "zodiacSign": zodiac_sign,
                **advice_data
            }
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@survival_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "alien-survival-api"})

