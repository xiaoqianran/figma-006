import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomTabBar, type TabId } from './components/BottomTabBar';
import { SplashScreen } from './screens/SplashScreen';
import { DestinationScreen } from './screens/DestinationScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AddCardScreen } from './screens/AddCardScreen';
import { CardScanScreen } from './screens/CardScanScreen';
import { SignInScreen } from './screens/SignInScreen';
import { VerifyScreen } from './screens/VerifyScreen';
import { RatingScreen } from './screens/RatingScreen';
import { CarResultScreen } from './screens/CarResultScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { GiftCodeScreen } from './screens/GiftCodeScreen';
import { AddPaymentScreen } from './screens/AddPaymentScreen';
import { SearchFlagsScreen } from './screens/SearchFlagsScreen';
import { SignInVariant1 } from './screens/SignInVariant1';
import { SignInSocial } from './screens/SignInSocial';
import { VerifyPage } from './screens/VerifyPage';
import { toast } from 'sonner';

// Available screens in the Rideshare demo (progressively implemented from Figma Final UI)
const SCREENS = [
  { id: 'splash', label: 'Splash Screen', ref: 'splash.png' },
  { id: 'sign-in', label: 'Sign in Page', ref: 'splash.png' },
  { id: 'verify', label: 'Verify Page', ref: 'splash.png' },
  { id: 'destination', label: 'Destination / Home', ref: 'destination.png' },
  { id: 'add-card', label: 'Add Card Page (Dark)', ref: 'add-card-dark.png' },
  { id: 'card-scan', label: 'Card Scan Page', ref: 'card-scan.png' },
  { id: 'car-result', label: 'Car Result Page', ref: 'car-result.png' },
  { id: 'rating', label: 'Rating & Tips Page', ref: 'car-result.png' },
  { id: 'settings', label: 'Settings Page', ref: 'settings.png' },
  { id: 'messages', label: 'Messages Page', ref: 'messages.png' },
  { id: 'gift-code', label: 'Gift Code Page', ref: 'gift-code.png' },
  { id: 'explore', label: 'Explore / Search', ref: 'destination.png' },
  { id: 'profile', label: 'Profile / Settings', ref: 'settings.png' },
  { id: 'add-payment', label: 'Add Payment Page', ref: 'add-payment.png' },
  { id: 'search-flags', label: 'Search Flags', ref: 'search-flags.png' },
  { id: 'sign-in-1', label: 'Sign in Page 1', ref: 'sign-in-1.png' },
  { id: 'sign-in-2', label: 'Sign in Page 2', ref: 'sign-in-2.png' },
  { id: 'sign-in-social', label: 'Sign in Social', ref: 'sign-in-social.png' },
  { id: 'verify-page', label: 'Verify Page', ref: 'verify-page.png' },
] as const;

type ScreenId = typeof SCREENS[number]['id'];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [showRef, setShowRef] = useState(true);
  const [isLight, setIsLight] = useState(false);

  // === Bottom Tab Navigation Model ===
  // Primary tabs live inside the phone and control main navigation.
  // Secondary flow screens (auth, booking steps, etc.) hide the tab bar and use back nav instead.
  const tabToScreen: Record<TabId, ScreenId> = {
    home: 'destination',
    explore: 'explore',
    messages: 'messages',
    profile: 'profile',
  };

  const [activeTab, setActiveTab] = useState<TabId>('home');

  const isTabScreen = (screen: ScreenId): boolean => 
    Object.values(tabToScreen).includes(screen);

  function switchToTab(tab: TabId) {
    const targetScreen = tabToScreen[tab];
    setActiveTab(tab);
    setCurrentScreen(targetScreen);
  }

  const active = SCREENS.find(s => s.id === currentScreen)!;
  const refSrc = `/figma-refs/${active.ref}`;

  function goTo(screen: ScreenId) {
    setCurrentScreen(screen);
    // Sync active tab when landing on a primary tab screen
    const matchedTab = (Object.entries(tabToScreen) as [TabId, ScreenId][])
      .find(([, s]) => s === screen)?.[0];
    if (matchedTab) {
      setActiveTab(matchedTab);
    }
    toast.success(`Switched to ${SCREENS.find(s => s.id === screen)?.label}`, { duration: 1200 });
  }

  function handleBack() {
    // Improved back: secondary flows return to the currently active primary tab
    if (currentScreen === 'splash') return;

    if (!isTabScreen(currentScreen)) {
      // Return to the tab the user was on before entering the flow
      const target = tabToScreen[activeTab];
      setCurrentScreen(target);
      return;
    }

    // On a tab screen: go to splash (or could stay / do nothing)
    setCurrentScreen('splash');
  }

  // Render the active screen component inside the phone
  function renderScreen() {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen 
            onCreateAccount={() => goTo('destination')}
            onSignIn={() => goTo('sign-in')}
          />
        );
      case 'sign-in':
        return (
          <SignInScreen 
            onContinue={() => goTo('verify')}
            onSocial={(p) => toast.success(`Signed in with ${p} (demo)`)}
          />
        );
      case 'verify':
        return (
          <VerifyScreen 
            onVerify={() => {
              toast.success('Phone verified!');
              goTo('destination');
            }} 
          />
        );
      case 'destination':
        // HOME TAB — wrap with relative container + BottomTabBar (fixed at bottom of content area)
        return (
          <div className="relative h-full w-full">
            <DestinationScreen 
              onSearchTap={() => goTo('car-result')}
              onPlaceSelect={(place) => {
                toast.info(`Selected ${place} — finding rides...`);
                goTo('car-result');
              }}
            />
            <BottomTabBar activeTab={activeTab} onTabChange={switchToTab} />
          </div>
        );
      case 'explore':
        // EXPLORE / SEARCH TAB
        return (
          <div className="relative h-full w-full">
            <ExploreScreen 
              onExploreRide={() => goTo('car-result')}
            />
            <BottomTabBar activeTab={activeTab} onTabChange={switchToTab} />
          </div>
        );
      case 'messages':
        // MESSAGES TAB
        return (
          <div className="relative h-full w-full">
            <MessagesScreen />
            <BottomTabBar activeTab={activeTab} onTabChange={switchToTab} />
          </div>
        );
      case 'profile':
        // PROFILE / SETTINGS TAB (reusing ProfileScreen for the 4th tab)
        return (
          <div className="relative h-full w-full">
            <ProfileScreen 
              onManagePayments={() => goTo('add-payment')}
              onLogout={() => {
                toast('Signed out');
                setActiveTab('home');
                setCurrentScreen('splash');
              }}
            />
            <BottomTabBar activeTab={activeTab} onTabChange={switchToTab} />
          </div>
        );
      case 'add-card':
        return (
          <AddCardScreen 
            onAddSuccess={() => {
              toast.success('Card added • Ride booked successfully!');
              goTo('rating');
            }} 
          />
        );
      case 'card-scan':
        return (
          <CardScanScreen 
            onScanSuccess={() => {
              toast.success('Card scanned successfully!');
              goTo('add-card');
            }} 
          />
        );
      case 'car-result':
        // Improved flow screen (no tab bar)
        return (
          <CarResultScreen 
            onBookRide={() => goTo('add-card')} 
          />
        );
      case 'rating':
        return (
          <RatingScreen 
            onSubmit={(r, tip) => {
              toast.success(`Rated ${r} stars${tip ? ` + $${tip} tip` : ''} — Thank you!`);
              goTo('destination'); // back to home tab
            }}
          />
        );
      case 'settings':
        return <SettingsScreen onBack={handleBack} onGiftCode={() => goTo('gift-code')} />;
      case 'gift-code':
        return <GiftCodeScreen onBack={() => goTo('settings')} />;
      case 'add-payment':
        return (
          <AddPaymentScreen 
            onBack={handleBack} 
            onAddNew={() => goTo('add-card')} 
          />
        );
      case 'search-flags':
        return (
          <SearchFlagsScreen 
            onBack={handleBack} 
            onSelect={(country, dial) => {
              toast.success(`Country code set to ${dial} (${country})`);
              handleBack();
            }} 
          />
        );
      case 'sign-in-1':
        return <SignInVariant1 variant="create" onBack={handleBack} onContinue={() => goTo('verify-page')} />;
      case 'sign-in-2':
        return <SignInVariant1 variant="profile" onBack={handleBack} onContinue={() => goTo('destination')} />;
      case 'sign-in-social':
        return <SignInSocial onBack={handleBack} onContinue={() => goTo('verify-page')} />;
      case 'verify-page':
        return <VerifyPage onVerify={() => { toast.success('Verified!'); goTo('destination'); }} />;
      default:
        return <div className="p-8 text-center text-sm">Screen not implemented yet</div>;
    }
  }

  return (
    <div className={`app-shell ${isLight ? 'light' : 'dark'}`}>
      <header className="app-header">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div>
            <h1 className="text-[#F8F4F4]">Meteor Rideshare</h1>
            <div className="subtitle">Figma Final UI → Pixel-perfect React implementation</div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-1 rounded-full bg-[#1a1f28] text-[#73767A] font-mono">375×812 • Sen</div>
            <button 
              onClick={() => setIsLight(!isLight)} 
              className="px-3 py-1 rounded-full bg-[#1a1f28] hover:bg-[#252c38] transition"
            >
              {isLight ? 'Dark' : 'Light'} theme
            </button>
            <button 
              onClick={() => setShowRef(!showRef)} 
              className="px-3 py-1 rounded-full bg-[#1a1f28] hover:bg-[#252c38] transition"
            >
              {showRef ? 'Hide' : 'Show'} Figma refs
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Left: Screen picker + controls */}
        <div className="screen-selector">
          <div className="uppercase text-[10px] tracking-[1.5px] text-[#73767A] mb-1 pl-1">SCREENS FROM FIGMA</div>
          
          {SCREENS.map(s => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className={`screen-btn ${currentScreen === s.id ? 'active' : ''}`}
            >
              {s.label}
            </button>
          ))}

          <div className="mt-6 pl-1 text-[10px] text-[#73767A] leading-snug">
            All colors, typography (Sen), radii, and spacing are taken directly from the 
            connected Figma Style Guide + Final UI via MCP.
          </div>

          <div className="mt-auto pt-8 text-[10px] text-[#4C5DF9] pl-1">
            Progress: 4 primary tabs (Home / Explore / Messages / Profile) + full booking flow • BottomTabBar integrated
          </div>
        </div>

        {/* Center: The Phone Emulator */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#73767A]">iPhone 14 Pro — Live Preview</div>
          
          <PhoneFrame 
            title={
              !isTabScreen(currentScreen) && 
              currentScreen !== 'splash' && 
              currentScreen !== 'add-payment' &&
              !['sign-in-1', 'sign-in-2', 'sign-in-social', 'verify-page'].includes(currentScreen)
                ? active.label 
                : undefined
            }
            showBack={
              !isTabScreen(currentScreen) && 
              currentScreen !== 'splash' && 
              currentScreen !== 'add-payment' &&
              !['sign-in-1', 'sign-in-2', 'sign-in-social', 'verify-page'].includes(currentScreen)
            }
            onBack={handleBack}
            variant="dark"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full w-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>

          <div className="mt-4 text-[11px] text-[#73767A] text-center max-w-[320px]">
            Tap buttons inside the device. Use the left panel to switch between Figma screens.
          </div>
        </div>

        {/* Right: Figma Reference Image */}
        {showRef && (
          <div className="ref-panel hidden lg:block">
            <div className="ref-label">
              <span>FIGMA SOURCE</span> 
              <span className="text-[#4C5DF9]">•</span> 
              <span>{active.label}</span>
            </div>
            <img 
              src={refSrc} 
              alt={`Figma reference for ${active.label}`}
              onClick={() => window.open(refSrc, '_blank')}
              className="cursor-zoom-in hover:opacity-95 transition"
            />
            <div className="text-[10px] text-[#73767A] mt-2 text-center">
              Click image to view full size • Captured live from Figma MCP
            </div>
          </div>
        )}
      </div>

      {/* Footer status */}
      <footer className="text-center py-3 text-[10px] text-[#45484D] border-t border-[#1f2530]">
        Built autonomously by multi-agent team • Based on Figma "Final UI" page (Rideshare UI Kit) • 
        <span className="text-[#4C5DF9]"> MCP connected</span>
      </footer>
    </div>
  );
}
