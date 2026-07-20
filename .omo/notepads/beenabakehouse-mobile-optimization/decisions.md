# Decisions - Beena Bakehouse Mobile Optimization

1. Mobile-First: Use unprefixed classes for mobile, md: and above for desktop
2. CSS Scroll-Snap for carousels (no external library)
3. CustomCursor: Disable on touch via useIsCoarsePointer()
4. Add width/height attrs to all img tags for CLS prevention
5. Mobile hamburger menu for Nav component
6. All inputs get text-base (16px) to prevent iOS zoom
7. Add scroll-mt-24 to section anchors for nav offset
8. Wrap App in MotionConfig reducedMotion="user"
9. Add safe-area-inset padding to nav
