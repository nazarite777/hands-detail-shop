<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hands Detail Shop | 16 Years of Excellence | Arnold, PA</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #e0e0e0;
            overflow-x: hidden;
            background: #0f0f0f;
        }

        /* Header Navigation */
        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(20, 20, 20, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(160, 160, 160, 0.2);
        }

        header.scrolled {
            background: rgba(15, 15, 15, 0.98);
            box-shadow: 0 2px 30px rgba(192, 192, 192, 0.15);
        }

        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .logo-img {
            height: 55px;
            width: auto;
            filter: drop-shadow(0 2px 8px rgba(192, 192, 192, 0.3));
        }

        .partnership-badge {
            font-size: 0.75rem;
            color: rgba(180, 180, 180, 0.8);
            border-left: 2px solid rgba(160, 160, 160, 0.4);
            padding-left: 15px;
            font-weight: 500;
        }

        .nav-menu {
            display: flex;
            gap: 35px;
            align-items: center;
        }

        .nav-link {
            color: #b8b8b8;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            font-size: 0.95rem;
            letter-spacing: 0.3px;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #909090, #c8c8c8);
            transition: width 0.3s ease;
        }

        .nav-link:hover::after {
            width: 100%;
        }

        .nav-link:hover {
            color: #ffffff;
        }

        .contact-header {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .phone-header {
            color: rgba(200, 200, 200, 0.9);
            font-size: 0.9rem;
        }
        
        .hours-header {
            color: rgba(180, 180, 180, 0.7);
            font-size: 0.8rem;
            border-right: 1px solid rgba(160, 160, 160, 0.4);
            padding-right: 15px;
        }

        .cta-header {
            background: linear-gradient(135deg, #4a4a4a, #6a6a6a);
            color: white;
            padding: 10px 28px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 1px solid rgba(160, 160, 160, 0.3);
            font-size: 0.9rem;
        }

        .cta-header:hover {
            background: linear-gradient(135deg, #5a5a5a, #7a7a7a);
            transform: translateY(-2px);
            box-shadow: 0 5px 25px rgba(180, 180, 180, 0.3);
            border-color: rgba(200, 200, 200, 0.5);
        }

        /* Promotional Banner */
        .promo-banner {
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            color: #c8c8c8;
            padding: 15px;
            text-align: center;
            font-weight: 600;
            position: relative;
            animation: slideDown 0.5s ease-out;
            border-bottom: 1px solid rgba(160, 160, 160, 0.2);
        }
        
        @keyframes slideDown {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.85);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: #1a1a1a;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            border: 1px solid rgba(160, 160, 160, 0.3);
        }

        .modal-header {
            background: linear-gradient(135deg, #2a2a2a, #3a3a3a);
            color: white;
            padding: 30px;
            border-radius: 20px 20px 0 0;
            border-bottom: 1px solid rgba(160, 160, 160, 0.2);
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(160, 160, 160, 0.2);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: rgba(180, 180, 180, 0.3);
            transform: rotate(90deg);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #c8c8c8;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid rgba(100, 100, 100, 0.5);
            background: rgba(30, 30, 30, 0.8);
            color: #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #909090;
            background: rgba(40, 40, 40, 0.9);
        }

        .form-submit {
            background: linear-gradient(135deg, #4a4a4a, #6a6a6a);
            color: white;
            padding: 15px 40px;
            border: 1px solid rgba(160, 160, 160, 0.3);
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }

        .form-submit:hover {
            background: linear-gradient(135deg, #5a5a5a, #7a7a7a);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(180, 180, 180, 0.3);
        }

        /* Mobile Menu */
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            gap: 4px;
            cursor: pointer;
        }

        .mobile-menu-toggle span {
            width: 25px;
            height: 3px;
            background: #c0c0c0;
            transition: all 0.3s ease;
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-nav {
            display: none;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(20, 20, 20, 0.98);
            padding: 20px;
            box-shadow: 0 5px 30px rgba(0,0,0,0.5);
            border-bottom: 1px solid rgba(160, 160, 160, 0.2);
        }

        .mobile-nav.active {
            display: block;
        }

        .mobile-nav a {
            display: block;
            color: #c0c0c0;
            text-decoration: none;
            padding: 15px;
            border-bottom: 1px solid rgba(100,100,100,0.3);
            transition: all 0.3s ease;
        }

        .mobile-nav a:hover {
            background: rgba(80,80,80,0.3);
            padding-left: 25px;
            color: white;
        }

        /* Welcome Hero Section */
        .welcome-hero {
            min-height: 100vh;
            padding-top: 80px;
            background: 
                linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(40, 40, 40, 0.9)),
                repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(100, 100, 100, 0.03) 10px,
                    rgba(100, 100, 100, 0.03) 20px
                );
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }

        .welcome-content {
            max-width: 1000px;
            padding: 40px;
            animation: fadeInUp 1s ease-out;
        }

        .hero-logo {
            max-width: 500px;
            width: 100%;
            height: auto;
            margin: 0 auto 30px;
            filter: drop-shadow(0 10px 30px rgba(192, 192, 192, 0.3));
            animation: fadeInUp 1s ease-out;
        }

        .tagline {
            font-size: clamp(1.3rem, 3vw, 1.8rem);
            font-weight: 700;
            margin-bottom: 15px;
            background: linear-gradient(90deg, #a0a0a0, #d0d0d0, #a0a0a0);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 4s ease infinite, fadeInUp 1s ease-out 0.2s both;
            letter-spacing: 1px;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .experience-banner {
            display: inline-block;
            background: linear-gradient(135deg, #3a3a3a, #505050);
            padding: 15px 40px;
            border-radius: 50px;
            font-size: 1.4rem;
            font-weight: 800;
            margin: 20px 0;
            border: 2px solid rgba(160, 160, 160, 0.3);
            animation: fadeInUp 1s ease-out 0.4s both;
            letter-spacing: 1px;
        }

        .welcome-subtitle {
            font-size: 1.3rem;
            margin-bottom: 30px;
            opacity: 0.9;
            animation: fadeInUp 1s ease-out 0.5s both;
            color: #c0c0c0;
        }

        .welcome-description {
            font-size: 1.1rem;
            margin-bottom: 40px;
            opacity: 0.85;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeInUp 1s ease-out 0.6s both;
            color: #b0b0b0;
            line-height: 1.8;
        }

        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
            40% { transform: translateX(-50%) translateY(-20px); }
            60% { transform: translateX(-50%) translateY(-10px); }
        }

        .scroll-indicator::after {
            content: "↓";
            font-size: 2rem;
            color: rgba(160,160,160,0.6);
        }

        /* About Section - NEW */
        .about-section {
            padding: 100px 20px;
            background: linear-gradient(135deg, #1a1a1a, #252525);
            border-top: 1px solid rgba(160, 160, 160, 0.2);
            border-bottom: 1px solid rgba(160, 160, 160, 0.2);
        }

        .about-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .about-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .about-title {
            font-size: 2.8rem;
            color: #d4d4d4;
            margin-bottom: 20px;
            font-weight: 800;
        }

        .about-subtitle {
            font-size: 1.3rem;
            color: #a0a0a0;
            font-style: italic;
        }

        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }

        .about-text {
            color: #b8b8b8;
            font-size: 1.1rem;
            line-height: 1.9;
        }

        .about-text p {
            margin-bottom: 20px;
        }

        .about-highlight {
            background: linear-gradient(135deg, #2a2a2a, #3a3a3a);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(160, 160, 160, 0.2);
        }

        .about-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin-top: 30px;
        }

        .stat-item {
            text-align: center;
            padding: 20px;
            background: rgba(50, 50, 50, 0.5);
            border-radius: 15px;
            border: 1px solid rgba(160, 160, 160, 0.15);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(90deg, #909090, #c8c8c8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .stat-label {
            color: #a0a0a0;
            margin-top: 10px;
            font-size: 0.95rem;
        }

        /* Service Selector Section */
        .service-selector {
            padding: 100px 20px;
            background: #0f0f0f;
        }

        .selector-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .selector-title {
            font-size: 2.8rem;
            color: #d4d4d4;
            margin-bottom: 20px;
            font-weight: 800;
        }

        .selector-subtitle {
            font-size: 1.2rem;
            color: #a0a0a0;
        }

        .service-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .service-card {
            background: linear-gradient(135deg, #1a1a1a, #252525);
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            text-decoration: none;
            color: inherit;
            display: block;
            border: 1px solid rgba(100, 100, 100, 0.3);
        }

        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #707070, #a0a0a0);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }

        .service-card:hover::before {
            transform: translateY(0);
        }

        .service-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 50px rgba(160,160,160,0.2);
            border-color: rgba(160, 160, 160, 0.5);
        }

        .service-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            display: block;
            filter: grayscale(30%);
        }

        .service-title {
            font-size: 1.5rem;
            color: #d4d4d4;
            margin-bottom: 15px;
            font-weight: 700;
        }

        .service-description {
            color: #a0a0a0;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .service-highlights {
            list-style: none;
            margin: 20px 0;
            text-align: left;
        }

        .service-highlights li {
            padding: 8px 0;
            color: #b0b0b0;
            position: relative;
            padding-left: 25px;
        }

        .service-highlights li::before {
            content: "→";
            position: absolute;
            left: 0;
            color: #909090;
            font-weight: bold;
        }

        .starting-price {
            font-size: 1.3rem;
            background: linear-gradient(90deg, #808080, #b0b0b0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            margin-top: 20px;
        }

        .explore-btn {
            display: inline-block;
            background: linear-gradient(135deg, #4a4a4a, #6a6a6a);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
            transition: all 0.3s ease;
            border: 1px solid rgba(160, 160, 160, 0.3);
        }

        .explore-btn:hover {
            background: linear-gradient(135deg, #5a5a5a, #7a7a7a);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(180,180,180,0.3);
        }

        /* How It Works */
        .how-it-works {
            padding: 100px 20px;
            background: linear-gradient(135deg, #1a1a1a, #252525);
            color: white;
            border-top: 1px solid rgba(160, 160, 160, 0.2);
            border-bottom: 1px solid rgba(160, 160, 160, 0.2);
        }

        .steps-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .steps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }

        .step-card {
            text-align: center;
            position: relative;
            padding: 30px;
            background: rgba(30, 30, 30, 0.5);
            border-radius: 20px;
            border: 1px solid rgba(100, 100, 100, 0.3);
        }

        .step-number {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #505050, #707070);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 700;
            margin: 0 auto 20px;
            border: 2px solid rgba(160, 160, 160, 0.3);
        }

        .step-title {
            font-size: 1.4rem;
            margin-bottom: 15px;
            color: #d4d4d4;
        }

        .step-description {
            opacity: 0.8;
            line-height: 1.6;
            color: #b0b0b0;
        }

        /* Quick Quote Section */
        .quick-quote {
            padding: 100px 20px;
            background: #0f0f0f;
            text-align: center;
        }

        .quote-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .quote-title {
            font-size: 2.5rem;
            color: #d4d4d4;
            margin-bottom: 30px;
            font-weight: 800;
        }

        .quote-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }

        .quote-option {
            background: linear-gradient(135deg, #1a1a1a, #252525);
            padding: 30px 20px;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid rgba(100, 100, 100, 0.3);
        }

        .quote-option:hover,
        .quote-option.selected {
            border-color: #808080;
            background: linear-gradient(135deg, #252525, #303030);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(160,160,160,0.2);
        }

        .option-title {
            font-size: 1.3rem;
            color: #d4d4d4;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .option-price {
            font-size: 1.1rem;
            color: #a0a0a0;
        }

        .contact-section {
            background: linear-gradient(135deg, #2a2a2a, #404040);
            padding: 60px 20px;
            border-radius: 0;
            margin-top: 40px;
            border-top: 1px solid rgba(160, 160, 160, 0.3);
            border-bottom: 1px solid rgba(160, 160, 160, 0.3);
        }

        .contact-title {
            font-size: 2rem;
            color: white;
            margin-bottom: 30px;
        }

        .contact-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .contact-btn {
            background: linear-gradient(135deg, #505050, #707070);
            color: white;
            padding: 18px 35px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: 1px solid rgba(160, 160, 160, 0.3);
        }

        .contact-btn:hover {
            background: linear-gradient(135deg, #606060, #808080);
            transform: scale(1.05);
            box-shadow: 0 10px 40px rgba(180,180,180,0.3);
        }

        /* Footer */
        footer {
            background: #0a0a0a;
            color: #b0b0b0;
            padding: 60px 20px 30px;
            border-top: 1px solid rgba(160, 160, 160, 0.2);
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .footer-section h3 {
            color: #c0c0c0;
            margin-bottom: 20px;
            font-size: 1.3rem;
        }

        .footer-section p,
        .footer-section a {
            color: rgba(180,180,180,0.8);
            text-decoration: none;
            line-height: 1.8;
            transition: color 0.3s ease;
        }

        .footer-section a:hover {
            color: #c8c8c8;
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 10px;
        }

        .partner-info {
            background: rgba(60,60,60,0.3);
            border-left: 3px solid #808080;
            padding: 15px;
            margin-top: 15px;
        }

        .partner-info h4 {
            color: #a0a0a0;
            margin-bottom: 10px;
        }

        .footer-bottom {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid rgba(100,100,100,0.3);
            color: rgba(160,160,160,0.6);
        }

        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 15px;
        }

        .social-link {
            width: 40px;
            height: 40px;
            background: rgba(80,80,80,0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            color: #a0a0a0;
            text-decoration: none;
            border: 1px solid rgba(100, 100, 100, 0.3);
        }

        .social-link:hover {
            background: rgba(100,100,100,0.5);
            transform: translateY(-3px);
            border-color: rgba(160, 160, 160, 0.5);
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Responsive */
        @media (max-width: 968px) {
            .about-content {
                grid-template-columns: 1fr;
                gap: 40px;
            }
        }

        @media (max-width: 768px) {
            .nav-menu,
            .contact-header .phone-header {
                display: none;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .partnership-badge {
                display: none;
            }
            
            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .social-links {
                justify-content: center;
            }

            .about-stats {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Header Navigation -->
    <header id="header">
        <div class="nav-container">
            <div class="logo-section">
                <img src="https://i.imgur.com/your-logo-here.png" alt="Hands Detail Shop Logo" class="logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display: none; font-size: 1.5rem; font-weight: 800; color: #c0c0c0; font-style: italic;">HANDS DETAIL</div>
                <span class="partnership-badge">Partner with 100 Details</span>
            </div>
            
            <nav class="nav-menu">
                <a href="#home" class="nav-link">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#services" class="nav-link">Services</a>
                <a href="#membership" class="nav-link">Membership</a>
                <a href="#packages" class="nav-link">Packages</a>
                <a href="#how-it-works" class="nav-link">Process</a>
                <a href="#quote" class="nav-link">Quote</a>
                <a href="https://medium.com/@handsdetailshop" target="_blank" class="nav-link">Blog</a>
                <a href="#contact" class="nav-link">Contact</a>
            </nav>
            
            <div class="contact-header">
                <span class="hours-header">Mon-Sat 8AM-6PM</span>
                <span class="phone-header">📞 (412) 752-8684</span>
                <span class="phone-header">💬 Text: (412) 752-8684</span>
                <a href="#" onclick="openBookingModal(); return false;" class="cta-header">Book Now</a>
            </div>
            
            <div class="mobile-menu-toggle" id="mobileToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        
        <nav class="mobile-nav" id="mobileNav">
            <a href="#home">Home</a>
            <a href="#about">About Nazir</a>
            <a href="#services">Services</a>
            <a href="#membership">Membership</a>
            <a href="#packages">Packages</a>
            <a href="#how-it-works">Process</a>
            <a href="#quote">Get Quote</a>
            <a href="https://medium.com/@handsdetailshop" target="_blank">Blog</a>
            <a href="#contact">Contact</a>
            <a href="tel:4127528684" style="background: linear-gradient(135deg, #505050, #707070); text-align: center; margin-top: 10px; border: 1px solid rgba(160,160,160,0.3);">📞 Call Now</a>
            <a href="sms:4127528684" style="background: rgba(50,50,50,0.5); text-align: center; margin-top: 10px; border: 1px solid rgba(160,160,160,0.3);">💬 Text Now</a>
        </nav>
    </header>

    <!-- Promotional Banner -->
    <div class="promo-banner" style="margin-top: 70px;">
        🎊 NEW YEAR SPECIAL: 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | 💳 $30 Deposit Secures Your Appointment | 📞 (412) 752-8684
    </div>

    <!-- Welcome Hero Section -->
    <section class="welcome-hero" id="home">
        <div class="welcome-content">
            <img src="https://i.postimg.cc/qqTWZqLC/hands-logo.png" alt="Hands Detail Shop Logo" class="hero-logo">
            
            <div class="tagline">Paying attention to detail is our driving factor</div>
            
            <div class="experience-banner">16 YEARS OF EXCELLENCE</div>
            
            <p class="welcome-subtitle">Military Precision Meets Automotive Perfection</p>
            <p class="welcome-description">From monthly residential plans to yacht detailing, we bring professional-grade service to every vehicle we touch. Air Force trained, locally trusted.</p>
            
            <!-- Trust Badges -->
            <div style="display: flex; gap: 20px; justify-content: center; margin-top: 30px; flex-wrap: wrap;">
                <span style="background: rgba(80,80,80,0.3); padding: 10px 20px; border-radius: 25px; border: 1px solid rgba(160,160,160,0.3); display: inline-block; color: #b8b8b8;">
                    👨‍👩‍👧‍👦 Family Owned & Operated
                </span>
                <span style="background: rgba(80,80,80,0.3); padding: 10px 20px; border-radius: 25px; border: 1px solid rgba(160,160,160,0.3); display: inline-block; color: #b8b8b8;">
                    🛡️ Licensed & Insured
                </span>
                <span style="background: rgba(80,80,80,0.3); padding: 10px 20px; border-radius: 25px; border: 1px solid rgba(160,160,160,0.3); display: inline-block; color: #b8b8b8;">
                    ✨ FREE ESTIMATES
                </span>
            </div>
            
            <!-- Service Counter -->
            <div style="margin-top: 30px;">
                <div style="font-size: 2.5rem; font-weight: 700; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">5,000+</div>
                <div style="opacity: 0.8; color: #a0a0a0;">Vehicles Detailed & Counting</div>
            </div>
            
            <div class="scroll-indicator"></div>
        </div>
    </section>

    <!-- About Section - NEW -->
    <section class="about-section" id="about">
        <div class="about-container">
            <div class="about-header">
                <h2 class="about-title">Meet Nazir El</h2>
                <p class="about-subtitle">Air Force Veteran | Master Detailer | Arnold, PA</p>
            </div>
            
            <div class="about-content">
                <div class="about-text">
                    <p>My story starts in Baton Rouge as the eldest of 5, where my uncle first opened my eyes to the power of a perfectly detailed vehicle—how it can transform not just a car, but someone's entire day.</p>
                    
                    <p>Life took an unexpected turn when Hurricane Katrina led me north at 16. After graduating from New Concord, Ohio, I served my country in the Air Force, working on diesel and jet engines. Those years taught me that perfection is in the details.</p>
                    
                    <p>For 16 years now, I've been bringing that same passion and precision to every detailing job—whether it's your daily driver, yacht, RV, tractor, or bus. From deep interior detailing to ceramic coating and beyond, no job is too big or small.</p>
                    
                    <p>Now partnered with 100 Details in Arnold City, PA, I'm ready to serve you with the care and expertise your vehicle deserves.</p>
                </div>
                
                <div class="about-highlight">
                    <h3 style="color: #d4d4d4; margin-bottom: 20px; font-size: 1.6rem;">Why Choose Hands Detail?</h3>
                    <div class="about-stats">
                        <div class="stat-item">
                            <div class="stat-number">16</div>
                            <div class="stat-label">Years of Excellence</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">5K+</div>
                            <div class="stat-label">Vehicles Detailed</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Customer Focused</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">⭐⭐⭐⭐⭐</div>
                            <div class="stat-label">5-Star Service</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Membership Program Section - NEW -->
    <section style="padding: 100px 20px; background: linear-gradient(135deg, #0a0a0a, #1a1a1a); border-top: 1px solid rgba(160,160,160,0.2); border-bottom: 1px solid rgba(160,160,160,0.2);" id="membership">
        <div style="max-width: 1400px; margin: 0 auto;">
            <!-- Section Header -->
            <div style="text-align: center; margin-bottom: 60px;">
                <h2 style="font-size: 3rem; color: #d4d4d4; margin-bottom: 20px; font-weight: 800;">Elite Membership Program</h2>
                <p style="font-size: 1.3rem; color: #a0a0a0; max-width: 800px; margin: 0 auto;">For vehicle owners who demand excellence. Biweekly professional maintenance keeps your investment pristine.</p>
            </div>

            <!-- How It Works -->
            <div style="background: linear-gradient(135deg, #2a2a2a, #3a3a3a); border-radius: 20px; padding: 50px; margin-bottom: 60px; border: 1px solid rgba(160,160,160,0.3);">
                <h3 style="color: #d4d4d4; margin-bottom: 30px; font-size: 1.8rem; text-align: center;">How Membership Works</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">1️⃣</div>
                        <h4 style="color: #c8c8c8; margin-bottom: 10px; font-size: 1.2rem;">Initial Restoration</h4>
                        <p style="color: #a0a0a0; line-height: 1.6;">Deep correction detail brings your vehicle to showroom condition. One-time investment.</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">2️⃣</div>
                        <h4 style="color: #c8c8c8; margin-bottom: 10px; font-size: 1.2rem;">Choose Your Plan</h4>
                        <p style="color: #a0a0a0; line-height: 1.6;">Select monthly tier based on your needs. Biweekly service keeps perfection maintained.</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">3️⃣</div>
                        <h4 style="color: #c8c8c8; margin-bottom: 10px; font-size: 1.2rem;">Assigned Service Day</h4>
                        <p style="color: #a0a0a0; line-height: 1.6;">Get your dedicated day (Mon-Thu). Every other week, same high standard.</p>
                    </div>
                </div>
            </div>

            <!-- Membership Tiers -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin-bottom: 60px;">
                
                <!-- Essential Tier -->
                <div style="background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 20px; padding: 40px; border: 1px solid rgba(100,100,100,0.3); position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; right: 0; background: linear-gradient(135deg, #505050, #606060); color: white; padding: 8px 20px; border-radius: 0 20px 0 15px; font-size: 0.85rem; font-weight: 600;">STARTER</div>
                    <h3 style="color: #d4d4d4; font-size: 1.8rem; margin: 20px 0 15px 0;">Essential Maintain</h3>
                    <div style="margin-bottom: 25px;">
                        <span style="font-size: 3rem; font-weight: 800; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$75</span>
                        <span style="color: #a0a0a0; font-size: 1.1rem;">/month</span>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 30px;">
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Biweekly exterior hand wash</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Interior vacuum & wipe down</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Window cleaning (inside/out)</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Tire dressing</li>
                        <li style="padding: 12px 0; color: #b8b8b8;">✓ Assigned service day</li>
                    </ul>
                    <button onclick="openBookingModal('essential-membership')" style="background: linear-gradient(135deg, #505050, #707070); color: white; padding: 15px; border: 1px solid rgba(160,160,160,0.3); border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; width: 100%; transition: all 0.3s ease;">
                        Join Essential
                    </button>
                </div>

                <!-- Premium Tier -->
                <div style="background: linear-gradient(135deg, #252525, #303030); border-radius: 20px; padding: 40px; border: 2px solid #909090; position: relative; overflow: hidden; transform: scale(1.05); box-shadow: 0 20px 60px rgba(160,160,160,0.2);">
                    <div style="position: absolute; top: 0; right: 0; background: linear-gradient(135deg, #707070, #909090); color: white; padding: 8px 20px; border-radius: 0 20px 0 15px; font-size: 0.85rem; font-weight: 600;">POPULAR</div>
                    <h3 style="color: #d4d4d4; font-size: 1.8rem; margin: 20px 0 15px 0;">Premium Maintain</h3>
                    <div style="margin-bottom: 25px;">
                        <span style="font-size: 3rem; font-weight: 800; background: linear-gradient(90deg, #a0a0a0, #d0d0d0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$110</span>
                        <span style="color: #a0a0a0; font-size: 1.1rem;">/month</span>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 30px;">
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #c8c8c8;">✓ Everything in Essential, plus:</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #c8c8c8;">✓ Premium carnauba wax</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #c8c8c8;">✓ Dashboard & console conditioning</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #c8c8c8;">✓ Door jamb cleaning</li>
                        <li style="padding: 12px 0; color: #c8c8c8;">✓ Priority scheduling</li>
                    </ul>
                    <button onclick="openBookingModal('premium-membership')" style="background: linear-gradient(135deg, #606060, #808080); color: white; padding: 15px; border: 1px solid rgba(180,180,180,0.4); border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; width: 100%; transition: all 0.3s ease;">
                        Join Premium
                    </button>
                </div>

                <!-- Ultimate Tier -->
                <div style="background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 20px; padding: 40px; border: 1px solid rgba(100,100,100,0.3); position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; right: 0; background: linear-gradient(135deg, #505050, #707070); color: white; padding: 8px 20px; border-radius: 0 20px 0 15px; font-size: 0.85rem; font-weight: 600;">ELITE</div>
                    <h3 style="color: #d4d4d4; font-size: 1.8rem; margin: 20px 0 15px 0;">Ultimate Maintain</h3>
                    <div style="margin-bottom: 25px;">
                        <span style="font-size: 3rem; font-weight: 800; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$145</span>
                        <span style="color: #a0a0a0; font-size: 1.1rem;">/month</span>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 30px;">
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Everything in Premium, plus:</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Paint sealant application</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Leather conditioning</li>
                        <li style="padding: 12px 0; border-bottom: 1px solid rgba(100,100,100,0.3); color: #b8b8b8;">✓ Spot stain removal</li>
                        <li style="padding: 12px 0; color: #b8b8b8;">✓ Engine bay wipe down</li>
                    </ul>
                    <button onclick="openBookingModal('ultimate-membership')" style="background: linear-gradient(135deg, #505050, #707070); color: white; padding: 15px; border: 1px solid rgba(160,160,160,0.3); border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; width: 100%; transition: all 0.3s ease;">
                        Join Ultimate
                    </button>
                </div>
            </div>

            <!-- Initial Restoration Required -->
            <div style="background: linear-gradient(135deg, #2a2a2a, #353535); border-radius: 20px; padding: 40px; margin-bottom: 60px; border: 1px solid rgba(160,160,160,0.3);">
                <h3 style="color: #d4d4d4; margin-bottom: 20px; font-size: 1.8rem; text-align: center;">One-Time Restoration Detail Required</h3>
                <p style="color: #a0a0a0; text-align: center; margin-bottom: 30px; max-width: 700px; margin-left: auto; margin-right: auto;">Before joining, your vehicle receives a comprehensive restoration detail - paint correction, clay bar treatment, interior extraction, engine bay cleaning. This establishes the baseline for biweekly maintenance.</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="text-align: center; padding: 20px; background: rgba(50,50,50,0.5); border-radius: 15px;">
                        <div style="color: #c8c8c8; font-size: 0.9rem; margin-bottom: 8px;">Compact Car</div>
                        <div style="font-size: 2rem; font-weight: 700; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$285</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(50,50,50,0.5); border-radius: 15px;">
                        <div style="color: #c8c8c8; font-size: 0.9rem; margin-bottom: 8px;">Mid-Size Car</div>
                        <div style="font-size: 2rem; font-weight: 700; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$365</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(50,50,50,0.5); border-radius: 15px;">
                        <div style="color: #c8c8c8; font-size: 0.9rem; margin-bottom: 8px;">SUV/Truck</div>
                        <div style="font-size: 2rem; font-weight: 700; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$445</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(50,50,50,0.5); border-radius: 15px;">
                        <div style="color: #c8c8c8; font-size: 0.9rem; margin-bottom: 8px;">Luxury Vehicle</div>
                        <div style="font-size: 2rem; font-weight: 700; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$525</div>
                    </div>
                </div>
            </div>

            <!-- Ceramic Coating Upgrade -->
            <div style="background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 20px; padding: 50px; border: 2px solid #808080; margin-bottom: 60px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                    <div>
                        <h3 style="color: #d4d4d4; font-size: 2rem; margin-bottom: 20px;">Ceramic Coating Upgrade</h3>
                        <p style="color: #b0b0b0; line-height: 1.8; margin-bottom: 20px;">Add professional ceramic coating during your restoration detail for ultimate paint protection and reduced maintenance needs.</p>
                        <ul style="list-style: none; padding: 0; color: #b8b8b8;">
                            <li style="padding: 10px 0;">✓ 5-year paint protection warranty</li>
                            <li style="padding: 10px 0;">✓ Hydrophobic self-cleaning effect</li>
                            <li style="padding: 10px 0;">✓ UV & chemical resistance</li>
                            <li style="padding: 10px 0;">✓ Reduce monthly fee by $25</li>
                        </ul>
                    </div>
                    <div style="text-align: center; background: rgba(40,40,40,0.5); padding: 40px; border-radius: 15px;">
                        <div style="font-size: 0.9rem; color: #a0a0a0; margin-bottom: 10px;">Add to Restoration</div>
                        <div style="font-size: 3rem; font-weight: 800; background: linear-gradient(90deg, #a0a0a0, #d0d0d0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 15px;">$500</div>
                        <div style="color: #b0b0b0; font-size: 0.95rem; margin-bottom: 20px;">One-time investment</div>
                        <div style="background: rgba(60,60,60,0.5); padding: 15px; border-radius: 10px; border: 1px solid rgba(160,160,160,0.2);">
                            <div style="color: #c8c8c8; font-size: 0.85rem;">Then pay only:</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #d0d0d0; margin-top: 8px;">$85/mo (Premium)</div>
                            <div style="color: #a0a0a0; font-size: 0.85rem; margin-top: 5px;">Save $300/year</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Savings Calculator -->
            <div style="background: linear-gradient(135deg, #2a2a2a, #3a3a3a); border-radius: 20px; padding: 50px; border: 1px solid rgba(160,160,160,0.3);">
                <h3 style="color: #d4d4d4; font-size: 2rem; margin-bottom: 30px; text-align: center;">Investment Breakdown: Premium Membership</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                    <!-- Without Ceramic -->
                    <div style="background: rgba(30,30,30,0.5); padding: 30px; border-radius: 15px; border: 1px solid rgba(100,100,100,0.3);">
                        <h4 style="color: #c8c8c8; margin-bottom: 20px; font-size: 1.3rem;">Standard Premium Plan</h4>
                        <div style="color: #b0b0b0; line-height: 2;">
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">
                                <span>Restoration (Mid-Size)</span>
                                <span style="color: #d0d0d0;">$365</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">
                                <span>Year 1 Monthly ($110×12)</span>
                                <span style="color: #d0d0d0;">$1,320</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 15px 0; font-weight: 700; font-size: 1.2rem;">
                                <span style="color: #c8c8c8;">Year 1 Total</span>
                                <span style="background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$1,685</span>
                            </div>
                            <div style="padding: 10px 0; color: #a0a0a0;">
                                Years 2-5: $1,320/year
                            </div>
                        </div>
                    </div>

                    <!-- With Ceramic -->
                    <div style="background: rgba(40,40,40,0.7); padding: 30px; border-radius: 15px; border: 2px solid #808080;">
                        <h4 style="color: #d4d4d4; margin-bottom: 20px; font-size: 1.3rem;">Premium + Ceramic Coating</h4>
                        <div style="color: #b0b0b0; line-height: 2;">
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">
                                <span>Restoration + Ceramic</span>
                                <span style="color: #d0d0d0;">$865</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">
                                <span>Year 1 Monthly ($85×12)</span>
                                <span style="color: #d0d0d0;">$1,020</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 15px 0; font-weight: 700; font-size: 1.2rem;">
                                <span style="color: #c8c8c8;">Year 1 Total</span>
                                <span style="background: linear-gradient(90deg, #a0a0a0, #d0d0d0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$1,885</span>
                            </div>
                            <div style="padding: 10px 0; color: #a0a0a0;">
                                Years 2-5: $1,020/year
                            </div>
                            <div style="background: rgba(80,80,80,0.3); padding: 15px; border-radius: 10px; margin-top: 15px; border: 1px solid rgba(160,160,160,0.2);">
                                <div style="color: #d0d0d0; font-weight: 700; font-size: 1.1rem;">5-Year Savings: $1,500</div>
                                <div style="color: #b0b0b0; font-size: 0.9rem; margin-top: 5px;">Plus 5-year paint protection</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div style="text-align: center; margin-top: 50px;">
                <h3 style="color: #d4d4d4; margin-bottom: 20px; font-size: 1.6rem;">Ready to Maintain Excellence?</h3>
                <p style="color: #a0a0a0; margin-bottom: 30px;">Join our elite membership program. Limited slots available per service day.</p>
                <button onclick="openBookingModal('membership')" style="background: linear-gradient(135deg, #606060, #808080); color: white; padding: 18px 50px; border: 1px solid rgba(180,180,180,0.4); border-radius: 50px; font-size: 1.2rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease;">
                    Apply for Membership
                </button>
                <p style="color: #909090; margin-top: 20px; font-size: 0.9rem;">Service days assigned at enrollment (Monday-Thursday, biweekly rotation)</p>
            </div>

            <!-- Membership Payment Calculator -->
            <div style="background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 20px; padding: 50px; margin-top: 60px; border: 2px solid #808080;">
                <h3 style="color: #d4d4d4; font-size: 2rem; margin-bottom: 15px; text-align: center;">Calculate Your Membership Investment</h3>
                <p style="color: #a0a0a0; text-align: center; margin-bottom: 40px;">Select your options below to calculate total initial payment (Restoration + First Month)</p>
                
                <div style="max-width: 700px; margin: 0 auto;">
                    <!-- Vehicle Type Selection -->
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 15px; font-weight: 600; color: #c8c8c8; font-size: 1.1rem;">Select Your Vehicle Type:</label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                            <button class="vehicle-option" data-price="285" onclick="selectVehicleType(this, 285, 'Compact')" style="background: rgba(60,60,60,0.5); color: #b8b8b8; padding: 15px; border: 2px solid rgba(100,100,100,0.3); border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                                Compact<br><span style="font-size: 0.85rem; opacity: 0.8;">$285</span>
                            </button>
                            <button class="vehicle-option" data-price="365" onclick="selectVehicleType(this, 365, 'Mid-Size')" style="background: rgba(60,60,60,0.5); color: #b8b8b8; padding: 15px; border: 2px solid rgba(100,100,100,0.3); border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                                Mid-Size<br><span style="font-size: 0.85rem; opacity: 0.8;">$365</span>
                            </button>
                            <button class="vehicle-option" data-price="445" onclick="selectVehicleType(this, 445, 'SUV/Truck')" style="background: rgba(60,60,60,0.5); color: #b8b8b8; padding: 15px; border: 2px solid rgba(100,100,100,0.3); border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                                SUV/Truck<br><span style="font-size: 0.85rem; opacity: 0.8;">$445</span>
                            </button>
                            <button class="vehicle-option" data-price="525" onclick="selectVehicleType(this, 525, 'Luxury')" style="background: rgba(60,60,60,0.5); color: #b8b8b8; padding: 15px; border: 2px solid rgba(100,100,100,0.3); border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                                Luxury<br><span style="font-size: 0.85rem; opacity: 0.8;">$525</span>
                            </button>
                        </div>
                    </div>

                    <!-- Membership Tier Selection -->
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 15px; font-weight: 600; color: #c8c8c8; font-size: 1.1rem;">Select Your Membership Tier:</label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                            <button class="tier-option" data-price="75" onclick="selectTier(this, 75, 'Essential')" style="background: rgba(60,60,60,0.5); color: #b8b8b8; padding: 15px; border: 2px solid rgba(100,100,100,0.3); border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                                Essential<br><span style="font-size: 0.85rem; opacity: 0.8;">$75/mo</span>
                            </button>
                            <button class="tier-option" data-price="110" onclick="selectTier(this, 110, 'Premium')" style="background: rgba(60,60,60,0.5); color: #b8b8b8; padding: 15px; border: 2px solid rgba(100,100,100,0.3); border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                                Premium<br><span style="font-size: 0.85rem; opacity: 0.8;">$110/mo</span>
                            </button>
                            <button class="tier-option" data-price="145" onclick="selectTier(this, 145, 'Ultimate')" style="background: rgba(60,60,60,0.5); color: #b8b8b8; padding: 15px; border: 2px solid rgba(100,100,100,0.3); border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                                Ultimate<br><span style="font-size: 0.85rem; opacity: 0.8;">$145/mo</span>
                            </button>
                        </div>
                    </div>

                    <!-- Ceramic Coating Option -->
                    <div style="margin-bottom: 30px;">
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; background: rgba(60,60,60,0.5); padding: 20px; border-radius: 10px; border: 2px solid rgba(100,100,100,0.3);">
                            <input type="checkbox" id="ceramicOption" onclick="toggleCeramic()" style="width: 20px; height: 20px; cursor: pointer;">
                            <span style="color: #c8c8c8; font-size: 1.05rem;">Add Ceramic Coating (+$500, reduces monthly by $25)</span>
                        </label>
                    </div>

                    <!-- Total Display -->
                    <div id="membershipTotal" style="background: linear-gradient(135deg, #2a2a2a, #3a3a3a); padding: 30px; border-radius: 15px; border: 2px solid #909090; margin-bottom: 30px; display: none;">
                        <div style="text-align: center;">
                            <div style="color: #a0a0a0; margin-bottom: 10px;">Initial Payment Breakdown:</div>
                            <div id="breakdownText" style="color: #b8b8b8; margin-bottom: 15px; line-height: 1.8;"></div>
                            <div style="border-top: 2px solid rgba(160,160,160,0.3); padding-top: 15px; margin-top: 15px;">
                                <div style="color: #c8c8c8; font-size: 1.1rem; margin-bottom: 8px;">Total Due Today:</div>
                                <div id="totalAmount" style="font-size: 3rem; font-weight: 800; background: linear-gradient(90deg, #a0a0a0, #d0d0d0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></div>
                            </div>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(160,160,160,0.2);">
                                <div style="color: #b0b0b0; font-size: 0.95rem;">Then <span id="monthlyAmount" style="font-weight: 700; color: #c8c8c8;"></span> per month (biweekly service)</div>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Button -->
                    <div id="paymentButton" style="display: none; text-align: center;">
                        <div style="background: rgba(80,80,80,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid rgba(160,160,160,0.2);">
                            <div style="color: #f39c12; font-size: 1.1rem; font-weight: 700; margin-bottom: 10px;">⚠️ IMPORTANT PAYMENT INSTRUCTIONS</div>
                            <div style="color: #c8c8c8; line-height: 1.6;">
                                When Square opens, <strong>manually enter the amount shown above</strong> in the payment field.<br>
                                The price will NOT auto-fill - you must type it in yourself.
                            </div>
                        </div>
                        <button onclick="proceedToPayment()" style="background: linear-gradient(135deg, #606060, #808080); color: white; padding: 20px 60px; border: 1px solid rgba(180,180,180,0.4); border-radius: 50px; font-size: 1.3rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; width: 100%;">
                            Pay Now & Secure Your Spot →
                        </button>
                        <p style="color: #909090; margin-top: 15px; font-size: 0.9rem;">Secure payment via Square. We'll contact you within 24 hours to schedule.</p>
                    </div>
                </div>
            </div>

            <!-- Blog & Social Follow CTA - NEW -->
            <div style="background: linear-gradient(135deg, #2a2a2a, #3a3a3a); border-radius: 20px; padding: 50px 30px; margin-top: 60px; border: 1px solid rgba(160,160,160,0.3); text-align: center;">
                <h3 style="color: #d4d4d4; font-size: 2rem; margin-bottom: 20px;">Stay Informed. Protect Your Investment.</h3>
                <p style="color: #b0b0b0; font-size: 1.2rem; margin-bottom: 30px; max-width: 700px; margin-left: auto; margin-right: auto;">Follow our blog for expert detailing insights, paint protection tips, and the science behind automotive care. New articles weekly.</p>
                
                <!-- Incentive Banner -->
                <div style="background: linear-gradient(135deg, #3a3a3a, #4a4a4a); border: 2px solid #909090; border-radius: 15px; padding: 30px; margin-bottom: 30px; max-width: 800px; margin-left: auto; margin-right: auto;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #d4d4d4; margin-bottom: 15px;">🎁 Follower Exclusive Benefits</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                        <div style="background: rgba(60,60,60,0.5); padding: 20px; border-radius: 10px; border: 1px solid rgba(160,160,160,0.2);">
                            <div style="font-size: 2rem; margin-bottom: 10px;">📘</div>
                            <div style="color: #c8c8c8; font-weight: 600; margin-bottom: 8px;">FREE Guide</div>
                            <div style="color: #a0a0a0; font-size: 0.95rem;">Download our "DIY Maintenance Between Details" PDF guide</div>
                        </div>
                        <div style="background: rgba(60,60,60,0.5); padding: 20px; border-radius: 10px; border: 1px solid rgba(160,160,160,0.2);">
                            <div style="font-size: 2rem; margin-bottom: 10px;">🏆</div>
                            <div style="color: #c8c8c8; font-weight: 600; margin-bottom: 8px;">Monthly Giveaway</div>
                            <div style="color: #a0a0a0; font-size: 0.95rem;">Win a FREE full detail every month (Facebook followers only)</div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-bottom: 30px;">
                    <a href="https://medium.com/@handsdetailshop" target="_blank" style="background: linear-gradient(135deg, #606060, #808080); color: white; padding: 18px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.1rem; border: 1px solid rgba(180,180,180,0.4); display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s ease;">
                        <span>📚</span>
                        <span>Follow Blog & Get Free Guide</span>
                    </a>
                    <a href="https://www.facebook.com/share/1FQft2edbP/" target="_blank" style="background: #1877f2; color: white; padding: 18px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.1rem; border: 1px solid rgba(24,119,242,0.4); display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s ease;">
                        <span>👍</span>
                        <span>Like & Enter Monthly Giveaway</span>
                    </a>
                </div>
                
                <div style="background: rgba(60,60,60,0.3); padding: 20px; border-radius: 15px; max-width: 600px; margin: 0 auto;">
                    <div style="color: #c8c8c8; font-weight: 600; margin-bottom: 15px;">Recent Blog Topics:</div>
                    <div style="color: #a0a0a0; line-height: 2; text-align: left;">
                        ✓ The Invisible War: What's Happening at the Microscopic Level<br>
                        ✓ Fleet Managers: Hidden Costs of Dirty Vehicles<br>
                        ✓ Why Your New Car Isn't Protected (Dealer Secrets)<br>
                        ✓ The 90-Day Window: When Paint Damage Becomes Permanent
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Service Selector Section -->
    <section class="service-selector" id="services">
        <div class="selector-header">
            <h2 class="selector-title">What Can We Detail For You?</h2>
            <p class="selector-subtitle">Choose your service category to explore our professional packages</p>
        </div>
        
        <div class="service-options">
            <!-- Personal Vehicles -->
            <div class="service-card" onclick="openBookingModal('personal')">
                <span class="service-icon">🚗</span>
                <h3 class="service-title">Personal Vehicles</h3>
                <p class="service-description">Professional detailing for your car, truck, or SUV</p>
                <ul class="service-highlights">
                    <li>5 package tiers available</li>
                    <li>Wash to ceramic coating</li>
                    <li>Same-day service</li>
                </ul>
                <div class="starting-price">Starting at $65</div>
                <span class="explore-btn">Explore Packages</span>
            </div>

            <!-- Monthly Plans -->
            <div class="service-card" onclick="openBookingModal('monthly')">
                <span class="service-icon">📅</span>
                <h3 class="service-title">Monthly Plans</h3>
                <p class="service-description">Convenient residential monthly contracts</p>
                <ul class="service-highlights">
                    <li>Scheduled service</li>
                    <li>Multi-car discounts</li>
                    <li>Priority booking</li>
                </ul>
                <div class="starting-price">From $80/month</div>
                <span class="explore-btn">View Plans</span>
            </div>

            <!-- Fleet Services -->
            <div class="service-card" onclick="openBookingModal('fleet')">
                <span class="service-icon">🚛</span>
                <h3 class="service-title">Commercial Fleet</h3>
                <p class="service-description">Volume contracts for businesses</p>
                <ul class="service-highlights">
                    <li>Dealership programs</li>
                    <li>Rental reconditioning</li>
                    <li>NET terms available</li>
                </ul>
                <div class="starting-price">Volume Pricing</div>
                <span class="explore-btn">Get Quote</span>
            </div>

            <!-- Marine & RV -->
            <div class="service-card" onclick="openBookingModal('marine')">
                <span class="service-icon">🛥️</span>
                <h3 class="service-title">Yacht & RV</h3>
                <p class="service-description">Mobile service for boats & motorhomes</p>
                <ul class="service-highlights">
                    <li>Marina-side service</li>
                    <li>Full RV detailing</li>
                    <li>Ceramic protection</li>
                </ul>
                <div class="starting-price">From $285</div>
                <span class="explore-btn">Learn More</span>
            </div>

            <!-- Motorcycle Services -->
            <div class="service-card" onclick="openBookingModal('motorcycle')">
                <span class="service-icon">🏍️</span>
                <h3 class="service-title">Motorcycle Detail</h3>
                <p class="service-description">Specialized bike detailing & protection</p>
                <ul class="service-highlights">
                    <li>Chrome & metal polishing</li>
                    <li>Chain cleaning & lube</li>
                    <li>Seasonal prep packages</li>
                </ul>
                <div class="starting-price">Starting at $85</div>
                <span class="explore-btn">View Packages</span>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works" id="how-it-works">
        <div class="steps-container">
            <div class="selector-header">
                <h2 class="selector-title" style="color: white;">How It Works</h2>
                <p class="selector-subtitle" style="color: rgba(180,180,180,0.8);">Simple process, exceptional results</p>
            </div>
            
            <div class="steps-grid">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <h3 class="step-title">Choose Your Service</h3>
                    <p class="step-description">Select from our comprehensive packages or build a custom solution</p>
                </div>
                
                <div class="step-card">
                    <div class="step-number">2</div>
                    <h3 class="step-title">Schedule Appointment</h3>
                    <p class="step-description">Call us or email for a time that works for you</p>
                </div>
                
                <div class="step-card">
                    <div class="step-number">3</div>
                    <h3 class="step-title">Professional Service</h3>
                    <p class="step-description">Our certified technicians deliver meticulous detailing</p>
                </div>
                
                <div class="step-card">
                    <div class="step-number">4</div>
                    <h3 class="step-title">Enjoy Your Vehicle</h3>
                    <p class="step-description">Drive away with a showroom-quality finish</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Quote Section -->
    <section class="quick-quote" id="quote">
        <div class="quote-container">
            <!-- Weather Widget -->
            <div style="background: linear-gradient(135deg, #2a2a2a, #3a3a3a); color: #c0c0c0; padding: 20px; border-radius: 15px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; border: 1px solid rgba(100,100,100,0.3);">
                <div>
                    <h3 style="margin: 0; font-size: 1.3rem; color: #d4d4d4;">Today's Detailing Weather</h3>
                    <p style="margin: 5px 0; opacity: 0.9;">Arnold, PA</p>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2.5rem;">☀️</div>
                    <div style="font-size: 1.2rem; font-weight: 600;">Perfect Day for Detailing!</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.1rem;">Indoor facility available</div>
                    <div style="opacity: 0.8;">Weather won't stop us!</div>
                </div>
            </div>

            <h2 class="quote-title">Get an Instant Estimate</h2>
            <p style="color: #a0a0a0; font-size: 1.1rem; margin-bottom: 40px;">Select your vehicle type for pricing</p>
            
            <div class="quote-options">
                <div class="quote-option" onclick="selectVehicle(this, 'compact')">
                    <div class="option-title">Compact Car</div>
                    <div class="option-price">Honda Civic, Corolla</div>
                </div>
                
                <div class="quote-option" onclick="selectVehicle(this, 'midsize')">
                    <div class="option-title">Mid-Size Car</div>
                    <div class="option-price">Accord, Camry</div>
                </div>
                
                <div class="quote-option" onclick="selectVehicle(this, 'suv')">
                    <div class="option-title">SUV/Truck</div>
                    <div class="option-price">Explorer, F-150</div>
                </div>
                
                <div class="quote-option" onclick="selectVehicle(this, 'motorcycle')">
                    <div class="option-title">Motorcycle</div>
                    <div class="option-price">All bike types</div>
                </div>
                
                <div class="quote-option" onclick="selectVehicle(this, 'luxury')">
                    <div class="option-title">Luxury/Exotic</div>
                    <div class="option-price">BMW, Mercedes</div>
                </div>
            </div>
            
            <div id="priceDisplay" style="display: none; margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 15px; border: 1px solid rgba(100,100,100,0.3);">
                <h3 style="color: #d4d4d4; margin-bottom: 20px;">Estimated Pricing Range</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                        <div style="color: #a0a0a0;" id="package1Label">Essential Package</div>
                        <div style="font-size: 1.8rem; background: linear-gradient(90deg, #808080, #b0b0b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;" id="essentialPrice">$65</div>
                    </div>
                    <div>
                        <div style="color: #a0a0a0;" id="package2Label">Executive Package</div>
                        <div style="font-size: 1.8rem; background: linear-gradient(90deg, #808080, #b0b0b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;" id="executivePrice">$145</div>
                    </div>
                    <div>
                        <div style="color: #a0a0a0;" id="package3Label">Presidential (Ceramic)</div>
                        <div style="font-size: 1.8rem; background: linear-gradient(90deg, #808080, #b0b0b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;" id="ceramicPrice">$585</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Customer Reviews Section -->
    <section style="padding: 100px 20px; background: linear-gradient(135deg, #1a1a1a, #252525); border-top: 1px solid rgba(160,160,160,0.2); border-bottom: 1px solid rgba(160,160,160,0.2);">
        <div style="max-width: 1400px; margin: 0 auto;">
            <!-- Section Header -->
            <div style="text-align: center; margin-bottom: 60px;">
                <h2 style="font-size: 2.8rem; color: #d4d4d4; margin-bottom: 20px;">What Our Customers Say</h2>
                <p style="font-size: 1.2rem; color: #a0a0a0; margin-bottom: 30px;">Over 100+ five-star reviews from satisfied customers across PA, OH, and WV</p>
                
                <!-- Overall Rating Display -->
                <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 40px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800;">4.9</div>
                        <div style="color: #c8c8c8; font-size: 1.5rem; margin: 10px 0;">★★★★★</div>
                        <div style="color: #a0a0a0;">Average Rating</div>
                    </div>
                    <div style="height: 60px; width: 1px; background: rgba(100,100,100,0.5);"></div>
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800;">150+</div>
                        <div style="color: #a0a0a0; margin-top: 10px;">Happy Customers</div>
                    </div>
                    <div style="height: 60px; width: 1px; background: rgba(100,100,100,0.5);"></div>
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; background: linear-gradient(90deg, #909090, #c8c8c8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800;">16+</div>
                        <div style="color: #a0a0a0; margin-top: 10px;">Years Experience</div>
                    </div>
                </div>
            </div>

            <!-- Featured Reviews Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-bottom: 50px;">
                
                <!-- Review 1 -->
                <div style="background: rgba(30,30,30,0.5); border-radius: 15px; padding: 30px; border-left: 4px solid #808080; border: 1px solid rgba(100,100,100,0.3);">
                    <div style="color: #c8c8c8; font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                    <p style="color: #b8b8b8; line-height: 1.6; margin-bottom: 20px; font-style: italic;">"Detailed was so friendly and did an amazing job. Will definitely be a repeat customer."</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: #d4d4d4;">Kristy E.</strong><br>
                            <span style="color: #a0a0a0; font-size: 0.9rem;">Pittsburgh, PA</span>
                        </div>
                        <span style="color: #909090; font-size: 0.9rem;">June 2025</span>
                    </div>
                </div>

                <!-- Review 2 -->
                <div style="background: rgba(30,30,30,0.5); border-radius: 15px; padding: 30px; border-left: 4px solid #808080; border: 1px solid rgba(100,100,100,0.3);">
                    <div style="color: #c8c8c8; font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                    <p style="color: #b8b8b8; line-height: 1.6; margin-bottom: 20px; font-style: italic;">"Carlton, great professional detailer above and beyond my foot motorhome was cleaner than when I picked it up at the dealer I will be requesting Carlton as a repeat customer"</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: #d4d4d4;">Ben A D.</strong><br>
                            <span style="color: #a0a0a0; font-size: 0.9rem;">McDonald, PA</span>
                        </div>
                        <span style="color: #909090; font-size: 0.9rem;">Oct 2024</span>
                    </div>
                </div>

                <!-- Review 3 -->
                <div style="background: rgba(30,30,30,0.5); border-radius: 15px; padding: 30px; border-left: 4px solid #808080; border: 1px solid rgba(100,100,100,0.3);">
                    <div style="color: #c8c8c8; font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                    <p style="color: #b8b8b8; line-height: 1.6; margin-bottom: 20px; font-style: italic;">"I was extremely impressed with how through my car was done. Everything looked like it was showroom perfect. He spent hours on my car and it shows!"</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: #d4d4d4;">Lisa I.</strong><br>
                            <span style="color: #a0a0a0; font-size: 0.9rem;">Pittsburgh, PA</span>
                        </div>
                        <span style="color: #909090; font-size: 0.9rem;">June 2024</span>
                    </div>
                </div>

                <!-- Review 4 -->
                <div style="background: rgba(30,30,30,0.5); border-radius: 15px; padding: 30px; border-left: 4px solid #808080; border: 1px solid rgba(100,100,100,0.3);">
                    <div style="color: #c8c8c8; font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                    <p style="color: #b8b8b8; line-height: 1.6; margin-bottom: 20px; font-style: italic;">"Had a last minute schedule change that caused the need to reschedule and Carlton accommodated my request. Car looks fabulous. My wife and I are extremely happy and Carlton was professional, courteous, and polite."</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: #d4d4d4;">Robert G.</strong><br>
                            <span style="color: #a0a0a0; font-size: 0.9rem;">Pittsburgh, PA</span>
                        </div>
                        <span style="color: #909090; font-size: 0.9rem;">July 2022</span>
                    </div>
                </div>

                <!-- Review 5 -->
                <div style="background: rgba(30,30,30,0.5); border-radius: 15px; padding: 30px; border-left: 4px solid #808080; border: 1px solid rgba(100,100,100,0.3);">
                    <div style="color: #c8c8c8; font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                    <p style="color: #b8b8b8; line-height: 1.6; margin-bottom: 20px; font-style: italic;">"This man is a jewel, hang on to him for dear life. His attention to detail is unprecedented. My car has never looked better! I will definitely use your detailing service in the future."</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: #d4d4d4;">Geoff S.</strong><br>
                            <span style="color: #a0a0a0; font-size: 0.9rem;">Cuyahoga Falls, OH</span>
                        </div>
                        <span style="color: #909090; font-size: 0.9rem;">Aug 2022</span>
                    </div>
                </div>

                <!-- Review 6 -->
                <div style="background: rgba(30,30,30,0.5); border-radius: 15px; padding: 30px; border-left: 4px solid #808080; border: 1px solid rgba(100,100,100,0.3);">
                    <div style="color: #c8c8c8; font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                    <p style="color: #b8b8b8; line-height: 1.6; margin-bottom: 20px; font-style: italic;">"He was extremely polite and friendly. He took extra time and care with the car as we had dog hair all over the back. My car hasn't looked this good since the day I first brought it home! Thank you Carlton!"</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: #d4d4d4;">Lynn B.</strong><br>
                            <span style="color: #a0a0a0; font-size: 0.9rem;">New Kensington, PA</span>
                        </div>
                        <span style="color: #909090; font-size: 0.9rem;">May 2025</span>
                    </div>
                </div>
            </div>

            <!-- Call to Action -->
            <div style="text-align: center; margin-top: 50px;">
                <h3 style="color: #d4d4d4; margin-bottom: 20px;">Join Our Happy Customers</h3>
                <p style="color: #a0a0a0; margin-bottom: 30px; font-size: 1.1rem;">Experience the same professional service that earned us 150+ five-star reviews</p>
                <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:4127528684" style="background: linear-gradient(135deg, #505050, #707070); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 1.1rem; border: 1px solid rgba(160,160,160,0.3);">
                        📞 Call (412) 752-8684
                    </a>
                    <a href="#quote" style="background: rgba(60,60,60,0.5); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 1.1rem; border: 1px solid rgba(160,160,160,0.3);">
                        Get Your Quote
                    </a>
                </div>
            </div>

            <!-- Leave a Review Section -->
            <div style="margin-top: 80px; padding: 50px 30px; background: linear-gradient(135deg, #252525, #303030); border-radius: 20px; border: 1px solid rgba(160,160,160,0.3);">
                <h3 style="color: #d4d4d4; margin-bottom: 15px; font-size: 2rem; text-align: center;">Share Your Experience</h3>
                <p style="color: #a0a0a0; margin-bottom: 30px; text-align: center;">We'd love to hear about your detailing experience</p>
                
                <form id="reviewForm" style="max-width: 600px; margin: 0 auto;">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #c8c8c8;">Your Name *</label>
                        <input type="text" name="reviewName" required placeholder="John Smith" style="width: 100%; padding: 12px; border: 2px solid rgba(100, 100, 100, 0.5); background: rgba(30, 30, 30, 0.8); color: #e0e0e0; border-radius: 10px; font-size: 1rem;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #c8c8c8;">Rating *</label>
                        <div style="display: flex; gap: 10px; font-size: 2rem;">
                            <span class="star-rating" data-rating="1" style="cursor: pointer; color: #606060;">★</span>
                            <span class="star-rating" data-rating="2" style="cursor: pointer; color: #606060;">★</span>
                            <span class="star-rating" data-rating="3" style="cursor: pointer; color: #606060;">★</span>
                            <span class="star-rating" data-rating="4" style="cursor: pointer; color: #606060;">★</span>
                            <span class="star-rating" data-rating="5" style="cursor: pointer; color: #606060;">★</span>
                        </div>
                        <input type="hidden" name="rating" id="ratingValue" required>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #c8c8c8;">Your Review *</label>
                        <textarea name="reviewText" required rows="4" placeholder="Tell us about your experience with Hands Detail Shop..." style="width: 100%; padding: 12px; border: 2px solid rgba(100, 100, 100, 0.5); background: rgba(30, 30, 30, 0.8); color: #e0e0e0; border-radius: 10px; font-size: 1rem; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #c8c8c8;">Email (optional)</label>
                        <input type="email" name="reviewEmail" placeholder="your@email.com" style="width: 100%; padding: 12px; border: 2px solid rgba(100, 100, 100, 0.5); background: rgba(30, 30, 30, 0.8); color: #e0e0e0; border-radius: 10px; font-size: 1rem;">
                    </div>
                    
                    <button type="submit" style="background: linear-gradient(135deg, #505050, #707070); color: white; padding: 15px 40px; border: 1px solid rgba(160, 160, 160, 0.3); border-radius: 50px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; width: 100%;">
                        Submit Review
                    </button>
                </form>
                
                <p style="text-align: center; margin-top: 20px; color: #909090; font-size: 0.9rem;">
                    Or leave a review on <a href="https://www.facebook.com/share/1FQft2edbP/" target="_blank" style="color: #b0b0b0; text-decoration: underline;">Facebook</a> or <a href="https://g.page/r/YOUR_GOOGLE_BUSINESS_LINK/review" target="_blank" style="color: #b0b0b0; text-decoration: underline;">Google</a>
                </p>
            </div>
        </div>
    </section>

    <!-- Complete Vehicle Services Section -->
    <section style="padding: 100px 20px; background: #0f0f0f; color: white;" id="packages">
        <div style="max-width: 1400px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 60px;">
                <h2 style="font-size: 2.8rem; margin-bottom: 20px; color: #d4d4d4;">Complete Vehicle Services</h2>
                <p style="font-size: 1.3rem; opacity: 0.9; max-width: 800px; margin: 0 auto; color: #a0a0a0;">Beyond detailing, we're your one-stop shop for complete vehicle enhancement and repair</p>
            </div>

            <!-- Professional Benefits Banner -->
            <div style="background: linear-gradient(135deg, #2a2a2a, #3a3a3a); border-radius: 20px; padding: 40px; margin-bottom: 60px; border: 1px solid rgba(100,100,100,0.3);">
                <h3 style="text-align: center; font-size: 1.8rem; margin-bottom: 30px; color: #d4d4d4;">Why Choose Professional Detailing?</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; text-align: center;">
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 10px;">🦠</div>
                        <h4 style="margin-bottom: 10px; color: #c8c8c8;">99.9% Sanitization</h4>
                        <p style="opacity: 0.85; color: #a0a0a0;">Removes bacteria & germs for a healthier environment</p>
                    </div>
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 10px;">🌸</div>
                        <h4 style="margin-bottom: 10px; color: #c8c8c8;">Odor Elimination</h4>
                        <p style="opacity: 0.85; color: #a0a0a0;">Eliminates odors at the source, not just masking</p>
                    </div>
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 10px;">✨</div>
                        <h4 style="margin-bottom: 10px; color: #c8c8c8;">Deep Restoration</h4>
                        <p style="opacity: 0.85; color: #a0a0a0;">Deep cleans carpets & upholstery to like-new condition</p>
                    </div>
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 10px;">💎</div>
                        <h4 style="margin-bottom: 10px; color: #c8c8c8;">Investment Protection</h4>
                        <p style="opacity: 0.85; color: #a0a0a0;">Maintains value and extends vehicle life</p>
                    </div>
                </div>
            </div>

            <!-- Additional Services Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
                
                <!-- Window Tinting -->
                <div style="background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(100,100,100,0.3);">
                    <div style="background: linear-gradient(135deg, #2a2a2a, #3a3a3a); padding: 30px; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🔲</div>
                        <h3 style="color: white; font-size: 1.8rem; margin: 0;">Window Tinting</h3>
                    </div>
                    <div style="padding: 30px; color: #b8b8b8;">
                        <p style="margin-bottom: 20px; line-height: 1.6;">Professional automotive window tinting for privacy, UV protection, and enhanced appearance.</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Legal tint levels (PA compliant)</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Premium ceramic film options</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ 99% UV ray protection</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Heat rejection technology</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Lifetime warranty available</li>
                            <li style="padding: 10px 0;">✓ Reduces interior fading</li>
                        </ul>
                        <div style="text-align: center; margin-top: 25px;">
                            <div style="font-size: 1.8rem; background: linear-gradient(90deg, #808080, #b0b0b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;">Starting at $185</div>
                            <p style="color: #909090; font-size: 0.9rem; margin-top: 5px;">Full vehicle from $285</p>
                        </div>
                    </div>
                </div>

                <!-- Vinyl Wrap & Graphics -->
                <div style="background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(100,100,100,0.3);">
                    <div style="background: linear-gradient(135deg, #3a2a4a, #4a3a5a); padding: 30px; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🎨</div>
                        <h3 style="color: white; font-size: 1.8rem; margin: 0;">Vinyl Wrap & Graphics</h3>
                    </div>
                    <div style="padding: 30px; color: #b8b8b8;">
                        <p style="margin-bottom: 20px; line-height: 1.6;">Transform your vehicle's appearance with custom vinyl wraps and professional graphics.</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Full vehicle color change wraps</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Custom business graphics</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Racing stripes & accents</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Chrome delete packages</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Matte, gloss, & satin finishes</li>
                            <li style="padding: 10px 0;">✓ Paint protection film (PPF)</li>
                        </ul>
                        <div style="text-align: center; margin-top: 25px;">
                            <div style="font-size: 1.8rem; background: linear-gradient(90deg, #808080, #b0b0b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;">Custom Quotes</div>
                            <p style="color: #909090; font-size: 0.9rem; margin-top: 5px;">Partial wraps from $485</p>
                        </div>
                    </div>
                </div>

                <!-- Headlight Restoration -->
                <div style="background: linear-gradient(135deg, #1a1a1a, #252525); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(100,100,100,0.3);">
                    <div style="background: linear-gradient(135deg, #3a3a2a, #4a4a3a); padding: 30px; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">💡</div>
                        <h3 style="color: white; font-size: 1.8rem; margin: 0;">Headlight Restoration</h3>
                    </div>
                    <div style="padding: 30px; color: #b8b8b8;">
                        <p style="margin-bottom: 20px; line-height: 1.6;">Restore clarity and brightness to foggy, yellowed headlights for improved safety and appearance.</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Multi-stage sanding process</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Professional grade compounds</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ UV protective sealant</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Improves night visibility</li>
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(100,100,100,0.3);">✓ Passes PA inspection</li>
                            <li style="padding: 10px 0;">✓ 1-year clarity guarantee</li>
                        </ul>
                        <div style="text-align: center; margin-top: 25px;">
                            <div style="font-size: 1.8rem; background: linear-gradient(90deg, #808080, #b0b0b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;">$85 per pair</div>
                            <p style="color: #909090; font-size: 0.9rem; margin-top: 5px;">Same-day service available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Contact Section -->
    <section class="contact-section" id="contact">
        <h3 class="contact-title" style="text-align: center;">Ready to Schedule Your Detail?</h3>
        <div class="contact-buttons">
            <a href="tel:4127528684" class="contact-btn">
                <span>📞</span>
                <span>Call (412) 752-8684</span>
            </a>
            <a href="mailto:handsdetailshop@gmail.com" class="contact-btn">
                <span>✉️</span>
                <span>Email Us</span>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Hands Detail Shop</h3>
                <p>Professional auto detailing services in partnership with 100 Details.</p>
                <p style="margin-top: 15px;">
                    <strong>📞 Phone:</strong> (412) 752-8684<br>
                    <strong>✉️ Email:</strong> <a href="mailto:handsdetailshop@gmail.com">handsdetailshop@gmail.com</a>
                </p>
                <div class="social-links">
                    <a href="https://www.facebook.com/share/1FQft2edbP/" target="_blank" class="social-link">f</a>
                    <a href="#" class="social-link">📷</a>
                    <a href="#" class="social-link">in</a>
                </div>
            </div>
            
            <div class="footer-section">
                <h3>Our Services</h3>
                <ul class="footer-links">
                    <li><a href="#packages">Personal Vehicle Detailing</a></li>
                    <li><a href="#packages">Monthly Residential Plans</a></li>
                    <li><a href="#packages">Commercial Fleet Services</a></li>
                    <li><a href="#packages">Yacht & Marine Detailing</a></li>
                    <li><a href="#packages">RV & Motorhome Services</a></li>
                    <li><a href="#packages">Ceramic Coating Protection</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Location & Hours</h3>
                <p>
                    <strong>📍 Address:</strong><br>
                    1532 Constitution Blvd<br>
                    Arnold, PA 15068
                </p>
                <p style="margin-top: 15px;">
                    <strong>🕒 Hours:</strong><br>
                    Monday - Saturday: 8AM - 6PM<br>
                    Sunday: By Appointment
                </p>
            </div>
            
            <div class="footer-section">
                <h3>Our Partnership</h3>
                <div class="partner-info">
                    <h4>100 Details</h4>
                    <p>
                        Located in Arnold, PA<br>
                        <a href="https://www.100details.com" target="_blank" style="color: #909090;">Visit 100 Details →</a>
                    </p>
                </div>
                <p style="margin-top: 15px;">
                    Proudly serving the Greater Pittsburgh area including Fox Chapel, Sewickley Heights, Upper St. Clair, and surrounding communities.
                </p>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 Hands Detail Shop | Partnership with 100 Details | All Rights Reserved</p>
            <p style="margin-top: 10px; font-size: 0.9rem;">Professional Auto Detailing Services | Arnold, PA | Licensed & Insured</p>
        </div>
    </footer>

    <!-- Booking Modal -->
    <div class="modal" id="bookingModal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close" onclick="closeBookingModal()">&times;</button>
                <h2 style="margin: 0;">Book Your Detail Service</h2>
                <p style="margin-top: 10px; opacity: 0.9;">Get a free quote or schedule your appointment</p>
            </div>
            <form style="padding: 30px;" id="bookingForm">
                <div class="form-group">
                    <label>Name *</label>
                    <input type="text" required placeholder="Your full name">
                </div>
                
                <div class="form-group">
                    <label>Phone *</label>
                    <input type="tel" required placeholder="(412) 555-0000">
                </div>
                
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com">
                </div>
                
                <div class="form-group">
                    <label>Vehicle Information *</label>
                    <input type="text" required placeholder="Year, Make, Model (e.g., 2020 Honda Accord)">
                </div>
                
                <div class="form-group">
                    <label>Service Type *</label>
                    <select required>
                        <option value="">Select a service...</option>
                        <optgroup label="Personal Vehicles">
                            <option>Essential Package ($65-85)</option>
                            <option>Executive Package ($145-185)</option>
                            <option>Signature Package ($285-365)</option>
                            <option>Presidential Package ($585-785)</option>
                            <option>Ultimate Armor ($1,285-1,685)</option>
                        </optgroup>
                        <optgroup label="Motorcycle Services">
                            <option>Road Ready ($85-105)</option>
                            <option>Chrome & Shine ($145-185)</option>
                            <option>Show Bike ($245-295)</option>
                            <option>Seasonal Prep ($125-155)</option>
                        </optgroup>
                        <optgroup label="Monthly Plans">
                            <option>Single Car Monthly ($80/mo)</option>
                            <option>Two Car Monthly ($140/mo)</option>
                            <option>Three+ Cars Monthly</option>
                        </optgroup>
                        <optgroup label="Specialty">
                            <option>Yacht/Boat Detail</option>
                            <option>RV/Motorhome Detail</option>
                            <option>Fleet Services</option>
                        </optgroup>
                        <option>Not Sure - Need Consultation</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Preferred Date</label>
                    <input type="date">
                </div>
                
                <div class="form-group">
                    <label>Message</label>
                    <textarea rows="3" placeholder="Tell us about your vehicle's condition or special requests..."></textarea>
                </div>
                
                <button type="submit" class="form-submit">Submit Booking Request</button>
                <p style="text-align: center; margin-top: 15px; color: #909090; font-size: 0.9rem;">
                    Or call us directly: <strong>(412) 752-8684</strong>
                </p>
            </form>
        </div>
    </div>

    <script>
        // Global variables
        let selectedVehicle = null;
        let selectedVehiclePrice = 0;
        let selectedVehicleName = '';
        let selectedTierPrice = 0;
        let selectedTierName = '';
        let ceramicAdded = false;

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileNav = document.getElementById('mobileNav');
        
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when link clicked
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        // Smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Booking Modal Functions
        function openBookingModal(preSelectedService = '') {
            document.getElementById('bookingModal').classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (preSelectedService) {
                const serviceSelect = document.querySelector('#bookingForm select');
                if (serviceSelect) {
                    const options = serviceSelect.querySelectorAll('option');
                    options.forEach(option => {
                        if (option.textContent.toLowerCase().includes(preSelectedService.toLowerCase())) {
                            option.selected = true;
                        }
                    });
                }
            }
        }

        function closeBookingModal() {
            document.getElementById('bookingModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Vehicle selection function
        function selectVehicle(element, type) {
            document.querySelectorAll('.quote-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            element.classList.add('selected');
            selectedVehicle = type;
            
            const prices = {
                compact: { essential: '$65', executive: '$145', ceramic: '$585' },
                midsize: { essential: '$75', executive: '$165', ceramic: '$685' },
                suv: { essential: '$85', executive: '$185', ceramic: '$785' },
                motorcycle: { essential: '$85', executive: '$145', ceramic: '$245' },
                luxury: { essential: '$95+', executive: '$225+', ceramic: '$985+' }
            };
            
            const priceLabels = {
                compact: { label1: 'Essential Package', label2: 'Executive Package', label3: 'Presidential (Ceramic)' },
                midsize: { label1: 'Essential Package', label2: 'Executive Package', label3: 'Presidential (Ceramic)' },
                suv: { label1: 'Essential Package', label2: 'Executive Package', label3: 'Presidential (Ceramic)' },
                motorcycle: { label1: 'Road Ready', label2: 'Chrome & Shine', label3: 'Show Bike' },
                luxury: { label1: 'Essential Package', label2: 'Executive Package', label3: 'Presidential (Ceramic)' }
            };
            
            const priceDisplay = document.getElementById('priceDisplay');
            priceDisplay.style.display = 'block';
            priceDisplay.style.opacity = '0';
            
            setTimeout(() => {
                priceDisplay.style.transition = 'opacity 0.5s ease';
                priceDisplay.style.opacity = '1';
            }, 10);
            
            document.getElementById('essentialPrice').textContent = prices[type].essential;
            document.getElementById('executivePrice').textContent = prices[type].executive;
            document.getElementById('ceramicPrice').textContent = prices[type].ceramic;
            
            document.getElementById('package1Label').textContent = priceLabels[type].label1;
            document.getElementById('package2Label').textContent = priceLabels[type].label2;
            document.getElementById('package3Label').textContent = priceLabels[type].label3;
            
            const existingBtn = document.getElementById('quoteBookingBtn');
            if (existingBtn) {
                existingBtn.remove();
            }
            
            const bookingBtn = document.createElement('div');
            bookingBtn.id = 'quoteBookingBtn';
            bookingBtn.style.textAlign = 'center';
            bookingBtn.style.marginTop = '30px';
            
            const buttonTexts = {
                compact: 'Book Your Car Detail',
                midsize: 'Book Your Car Detail', 
                suv: 'Book Your SUV Detail',
                motorcycle: 'Book Your Motorcycle Detail',
                luxury: 'Book Your Luxury Detail'
            };
            
            bookingBtn.innerHTML = `
                <button onclick="openBookingModal('${type}')" style="background: linear-gradient(135deg, #505050, #707070); color: white; padding: 15px 40px; border: 1px solid rgba(160,160,160,0.3); border-radius: 50px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    ${buttonTexts[type]} →
                </button>
            `;
            
            priceDisplay.appendChild(bookingBtn);
            
            setTimeout(() => {
                priceDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }

        // Membership Calculator Functions
        function selectVehicleType(element, price, name) {
            document.querySelectorAll('.vehicle-option').forEach(btn => {
                btn.style.background = 'rgba(60,60,60,0.5)';
                btn.style.borderColor = 'rgba(100,100,100,0.3)';
            });
            
            element.style.background = 'rgba(80,80,80,0.7)';
            element.style.borderColor = '#909090';
            
            selectedVehiclePrice = price;
            selectedVehicleName = name;
            calculateTotal();
        }

        function selectTier(element, price, name) {
            document.querySelectorAll('.tier-option').forEach(btn => {
                btn.style.background = 'rgba(60,60,60,0.5)';
                btn.style.borderColor = 'rgba(100,100,100,0.3)';
            });
            
            element.style.background = 'rgba(80,80,80,0.7)';
            element.style.borderColor = '#909090';
            
            selectedTierPrice = price;
            selectedTierName = name;
            calculateTotal();
        }

        function toggleCeramic() {
            ceramicAdded = document.getElementById('ceramicOption').checked;
            calculateTotal();
        }

        function calculateTotal() {
            if (selectedVehiclePrice === 0 || selectedTierPrice === 0) {
                return;
            }

            const restorationCost = selectedVehiclePrice;
            const ceramicCost = ceramicAdded ? 500 : 0;
            const monthlyFee = ceramicAdded ? selectedTierPrice - 25 : selectedTierPrice;
            const totalUpfront = restorationCost + ceramicCost + monthlyFee;

            let breakdown = `${selectedVehicleName} Restoration: $${restorationCost}<br>`;
            if (ceramicAdded) {
                breakdown += `Ceramic Coating: $${ceramicCost}<br>`;
            }
            breakdown += `First Month (${selectedTierName}): $${monthlyFee}`;

            document.getElementById('breakdownText').innerHTML = breakdown;
            document.getElementById('totalAmount').textContent = `$${totalUpfront}`;
            document.getElementById('monthlyAmount').textContent = `$${monthlyFee}/month`;
            
            document.getElementById('membershipTotal').style.display = 'block';
            document.getElementById('paymentButton').style.display = 'block';

            window.membershipPayment = {
                total: totalUpfront,
                vehicle: selectedVehicleName,
                tier: selectedTierName,
                ceramic: ceramicAdded,
                monthly: monthlyFee
            };
        }

        function proceedToPayment() {
            const payment = window.membershipPayment;
            const squareVariableLink = 'https://square.link/u/bz9x5CLc';
            const details = `Membership: ${payment.vehicle} ${payment.tier}${payment.ceramic ? ' + Ceramic' : ''} | Monthly: $${payment.monthly}`;
            
            window.open(squareVariableLink + `?amount=${payment.total}00&note=${encodeURIComponent(details)}`, '_blank');
            
            setTimeout(() => {
                alert(`Payment window opened for $${payment.total}\n\nPlease enter exactly: $${payment.total}\n\nAfter payment, we'll contact you within 24 hours to:\n✓ Assign your service day (Mon-Thu)\n✓ Schedule restoration detail\n✓ Set up monthly billing ($${payment.monthly}/month)`);
            }, 500);
        }

        // Booking form submission
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            
            const squareDepositLink = 'https://square.link/u/vScfV4jK';
            const details = `${name} - ${phone} - ${service}`;
            
            window.open(squareDepositLink + `?note=${encodeURIComponent(details)}`, '_blank');
            
            setTimeout(() => {
                alert(`Payment window opened for $30 deposit.\n\nAfter payment, we'll contact you at ${phone} within 24 hours to confirm your appointment.`);
                closeBookingModal();
                this.reset();
            }, 500);
        });

        // Close modal when clicking outside
        document.getElementById('bookingModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeBookingModal();
            }
        });

        // Star Rating System
        const stars = document.querySelectorAll('.star-rating');
        const ratingValue = document.getElementById('ratingValue');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingValue.value = rating;
                
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.style.color = '#c8c8c8';
                    } else {
                        s.style.color = '#606060';
                    }
                });
            });
            
            star.addEventListener('mouseenter', function() {
                const rating = this.getAttribute('data-rating');
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.style.color = '#a0a0a0';
                    }
                });
            });
        });
        
        document.querySelector('.star-rating').parentElement.addEventListener('mouseleave', function() {
            const currentRating = ratingValue.value;
            stars.forEach(s => {
                if (currentRating && s.getAttribute('data-rating') <= currentRating) {
                    s.style.color = '#c8c8c8';
                } else {
                    s.style.color = '#606060';
                }
            });
        });

        // Review Form Submission
        document.getElementById('reviewForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const reviewData = {
                name: formData.get('reviewName'),
                rating: formData.get('rating'),
                text: formData.get('reviewText'),
                email: formData.get('reviewEmail'),
                date: new Date().toISOString()
            };
            
            alert(`Thank you ${reviewData.name}!\n\nYour ${reviewData.rating}-star review has been submitted.\n\nWe appreciate your feedback and will review it shortly.`);
            
            this.reset();
            ratingValue.value = '';
            stars.forEach(s => s.style.color = '#606060');
        });
    </script>

    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/68e2fac9bf465d19518ec75b/1j6ra78mi';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    </script>
    <!--End of Tawk.to Script-->

</body>
</html>
