$mappings = @{
    # Components
    "src/components/layout.tsx" = "src/components/Layout.tsx"
    "src/components/sections/contact-section.tsx" = "src/components/ContactSection.tsx"
    "src/components/sections/fan-carousel-section.tsx" = "src/components/FanCarouselSection.tsx"
    "src/components/sections/footer-section.tsx" = "src/components/Footer.tsx"
    "src/components/sections/stacked-carousel-section.tsx" = "src/components/StackedCarouselSection.tsx"
    "src/components/sections/technologies-section.tsx" = "src/components/TechnologiesSection.tsx"
    "src/components/sections/testimonials-section.tsx" = "src/components/TestimonialsSection.tsx"
    "src/components/ui/badge.tsx" = "src/components/Badge.tsx"
    "src/components/ui/basic-contact-form.tsx" = "src/components/BasicContactForm.tsx"
    "src/components/ui/card-fan-carousel.tsx" = "src/components/CardFanCarousel.tsx"
    "src/components/ui/circular-testimonials.tsx" = "src/components/CircularTestimonials.tsx"
    "src/components/ui/expandable-gallery.tsx" = "src/components/ExpandableGallery.tsx"
    "src/components/ui/hero.tsx" = "src/components/Hero.tsx"
    "src/components/ui/liquid-glass.tsx" = "src/components/LiquidGlass.tsx"
    "src/components/ui/navbar.tsx" = "src/components/Navbar.tsx"
    "src/components/ui/premium-contact-form.tsx" = "src/components/PremiumContactForm.tsx"
    "src/components/ui/stacked-carousel.tsx" = "src/components/StackedCarousel.tsx"

    # Pages
    "src/pages/about.tsx" = "src/pages/AboutPage.tsx"
    "src/pages/contact.tsx" = "src/pages/ContactPage.tsx"
    "src/pages/home.tsx" = "src/pages/Home.tsx"
    "src/pages/not-found.tsx" = "src/pages/NotFound.tsx"
    "src/pages/portfolio.tsx" = "src/pages/PortfolioPage.tsx"
    "src/pages/services/index.tsx" = "src/pages/ServicesPage.tsx"
    "src/pages/services/ecommerce.tsx" = "src/pages/services/EcommerceWebsite.tsx"
    "src/pages/services/ppc.tsx" = "src/pages/services/PPCServices.tsx"
    "src/pages/services/seo.tsx" = "src/pages/services/SEOOptimization.tsx"
    "src/pages/services/shopify-development.tsx" = "src/pages/services/ShopifyDevelopment.tsx"
    "src/pages/services/website-development.tsx" = "src/pages/services/WebsiteDevelopment.tsx"
}

$importMappings = @{
    "@/components/layout" = "@/components/Layout"
    "@/components/sections/contact-section" = "@/components/ContactSection"
    "@/components/sections/fan-carousel-section" = "@/components/FanCarouselSection"
    "@/components/sections/footer-section" = "@/components/Footer"
    "@/components/sections/stacked-carousel-section" = "@/components/StackedCarouselSection"
    "@/components/sections/technologies-section" = "@/components/TechnologiesSection"
    "@/components/sections/testimonials-section" = "@/components/TestimonialsSection"
    "@/components/ui/badge" = "@/components/Badge"
    "@/components/ui/basic-contact-form" = "@/components/BasicContactForm"
    "@/components/ui/card-fan-carousel" = "@/components/CardFanCarousel"
    "@/components/ui/circular-testimonials" = "@/components/CircularTestimonials"
    "@/components/ui/expandable-gallery" = "@/components/ExpandableGallery"
    "@/components/ui/hero" = "@/components/Hero"
    "@/components/ui/liquid-glass" = "@/components/LiquidGlass"
    "@/components/ui/navbar" = "@/components/Navbar"
    "@/components/ui/premium-contact-form" = "@/components/PremiumContactForm"
    "@/components/ui/stacked-carousel" = "@/components/StackedCarousel"
    "./ui/navbar" = "./Navbar"
    "./sections/footer-section" = "./Footer"
    "./components/layout" = "./components/Layout"
    "./pages/home" = "./pages/Home"
    "./pages/about" = "./pages/AboutPage"
    "./pages/portfolio" = "./pages/PortfolioPage"
    "./pages/contact" = "./pages/ContactPage"
    "./pages/services" = "./pages/ServicesPage"
    "./pages/services/website-development" = "./pages/services/WebsiteDevelopment"
    "./pages/services/shopify-development" = "./pages/services/ShopifyDevelopment"
    "./pages/services/seo" = "./pages/services/SEOOptimization"
    "./pages/services/ecommerce" = "./pages/services/EcommerceWebsite"
    "./pages/services/ppc" = "./pages/services/PPCServices"
    "./pages/not-found" = "./pages/NotFound"
}

# 1. Rename files
foreach ($oldPath in $mappings.Keys) {
    if (Test-Path $oldPath) {
        $newPath = $mappings[$oldPath]
        Move-Item -Path $oldPath -Destination $newPath -Force
        Write-Host "Moved $oldPath to $newPath"
    } else {
        Write-Host "File not found: $oldPath"
    }
}

# 2. Update imports inside files
$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx, *.ts, *.css
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    foreach ($oldImport in $importMappings.Keys) {
        $newImport = $importMappings[$oldImport]
        if ($content.Contains($oldImport)) {
            $content = $content.Replace($oldImport, $newImport)
            $modified = $true
        }
    }
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated imports in $($file.FullName)"
    }
}

# 3. Clean up empty directories
if (Test-Path "src/components/ui") { Remove-Item "src/components/ui" -Recurse -Force }
if (Test-Path "src/components/sections") { Remove-Item "src/components/sections" -Recurse -Force }
