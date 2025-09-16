import React, { useEffect, useState } from 'react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [liverunCoins, setLiverunCoins] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [runningSpeed, setRunningSpeed] = useState(1);
  const [autoRunners, setAutoRunners] = useState(0);
  const [upgrades, setUpgrades] = useState({
    clickPower: 0,
    runningSpeed: 0,
    autoRunners: 0,
    multiplier: 0
  });

  // Auto-running system
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRunners > 0) {
        const autoEarnings = autoRunners * runningSpeed * 0.1;
        setLiverunCoins(prev => prev + autoEarnings);
        setTotalDistance(prev => prev + autoEarnings);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [autoRunners, runningSpeed]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const upgradeData = [
    {
      name: "CLICK POWER",
      description: "Increase coins per click",
      baseCost: 10,
      level: upgrades.clickPower,
      effect: () => setClickPower(prev => prev + 1)
    },
    {
      name: "RUNNING SPEED",
      description: "Run faster, earn more",
      baseCost: 25,
      level: upgrades.runningSpeed,
      effect: () => setRunningSpeed(prev => prev + 0.5)
    },
    {
      name: "AUTO RUNNERS",
      description: "Passive income runners",
      baseCost: 100,
      level: upgrades.autoRunners,
      effect: () => setAutoRunners(prev => prev + 1)
    },
    {
      name: "MULTIPLIER",
      description: "2x all earnings",
      baseCost: 500,
      level: upgrades.multiplier,
      effect: () => {
        setClickPower(prev => prev * 2);
        setRunningSpeed(prev => prev * 2);
      }
    }
  ];

  const achievements = [
    { name: "FIRST STEPS", requirement: 100, reward: "50 bonus coins" },
    { name: "MARATHON RUNNER", requirement: 1000, reward: "Speed boost" },
    { name: "ULTRA RUNNER", requirement: 5000, reward: "Click power x2" },
    { name: "LEGENDARY", requirement: 10000, reward: "Auto runner team" },
    { name: "GODLIKE", requirement: 50000, reward: "Ultimate multiplier" }
  ];

  const milestones = [
    { distance: 100, mcap: '10K', reward: 'Speed +1' },
    { distance: 500, mcap: '50K', reward: 'Click +2' },
    { distance: 1000, mcap: '100K', reward: 'Auto Runner' },
    { distance: 5000, mcap: '500K', reward: 'Multiplier x2' },
    { distance: 10000, mcap: '1M', reward: 'Elite Status' },
    { distance: 25000, mcap: '5M', reward: 'Legendary Power' },
    { distance: 50000, mcap: '10M', reward: 'Ultimate Runner' }
  ];

  const handleClick = () => {
    const earnings = clickPower * (0.1 + upgrades.multiplier);
    setLiverunCoins(prev => prev + earnings);
    setTotalDistance(prev => prev + earnings);
  };

  const buyUpgrade = (upgradeIndex: number) => {
    const upgrade = upgradeData[upgradeIndex];
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.level));
    
    if (liverunCoins >= cost) {
      setLiverunCoins(prev => prev - cost);
      setUpgrades(prev => ({
        ...prev,
        [upgradeIndex === 0 ? 'clickPower' : 
         upgradeIndex === 1 ? 'runningSpeed' :
         upgradeIndex === 2 ? 'autoRunners' : 'multiplier']: prev[
          upgradeIndex === 0 ? 'clickPower' : 
          upgradeIndex === 1 ? 'runningSpeed' :
          upgradeIndex === 2 ? 'autoRunners' : 'multiplier'
        ] + 1
      }));
      upgrade.effect();
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num).toString();
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Fixed Background */}
     <div className="fixed inset-0 z-0 overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  >
    <source src="https://streamable.com/ehw2q2" type="video/mp4" />
    Votre navigateur ne supporte pas la vidéo HTML5.
  </video>
</div>

      
      {/* Overlay */}
      <div className="fixed inset-0 z-5 bg-black bg-opacity-50" />
      
      {/* Stats Bar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-orange-400 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-white font-black">
          <div className="text-2xl">💰 {formatNumber(liverunCoins)} LIVERUN</div>
          <div className="text-xl">🏃 {formatNumber(totalDistance)}KM</div>
          <div className="text-lg">⚡ {clickPower} Power | 🚀 {runningSpeed.toFixed(1)}x Speed</div>
          <div className="text-lg">🤖 {autoRunners} Auto Runners</div>
        </div>
      </div>

      {/* Hero Section - Main Clicker */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-9xl font-black mb-8 text-white cartoon-text">
            $LIVERUN
          </h1>
          <div className="text-4xl font-bold text-orange-400 mb-8">
            CLICK TO RUN!
          </div>
        </div>
        
        {/* Main Click Button */}
        <div className="mb-12">
          <button 
            onClick={handleClick}
            className="bg-orange-400 text-white px-16 py-12 rounded-full text-4xl font-black shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-150 active:scale-95 animate-pulse"
          >
            🏃 RUN! 🏃
            <div className="text-lg mt-2">+{clickPower} per click</div>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="text-2xl font-black text-orange-400">{formatNumber(liverunCoins)}</div>
            <div className="text-sm text-gray-600">COINS</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="text-2xl font-black text-blue-500">{formatNumber(totalDistance)}</div>
            <div className="text-sm text-gray-600">DISTANCE</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="text-2xl font-black text-green-500">{clickPower}</div>
            <div className="text-sm text-gray-600">POWER</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="text-2xl font-black text-purple-500">{runningSpeed.toFixed(1)}x</div>
            <div className="text-sm text-gray-600">SPEED</div>
          </div>
        </div>
      </section>

      {/* Upgrades Shop */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-16 text-white cartoon-text">
            UPGRADE SHOP
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upgradeData.map((upgrade, index) => {
              const cost = Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.level));
              const canAfford = liverunCoins >= cost;
              
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <h3 className="text-xl font-black text-orange-400 mb-2">
                    {upgrade.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {upgrade.description}
                  </p>
                  <div className="text-lg font-bold text-blue-500 mb-3">
                    Level: {upgrade.level}
                  </div>
                  <button 
                    onClick={() => buyUpgrade(index)}
                    disabled={!canAfford}
                    className={`w-full py-3 rounded-full text-lg font-black transition-all duration-300 ${
                      canAfford
                        ? 'bg-green-500 text-white hover:bg-green-600 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {formatNumber(cost)} COINS
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-16 text-white cartoon-text">
            ACHIEVEMENTS
          </h2>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const isUnlocked = totalDistance >= achievement.requirement;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-6 rounded-2xl transform transition-all duration-500 hover:scale-105 shadow-xl ${
                    isUnlocked ? 'bg-green-500' : 'bg-white'
                  }`}
                >
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isUnlocked ? 'text-white' : 'text-gray-800'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-lg ${
                      isUnlocked ? 'text-white' : 'text-gray-600'
                    }`}>
                      {achievement.reward}
                    </p>
                  </div>
                  
                  <div className={`text-right ${
                    isUnlocked ? 'text-white' : 'text-gray-600'
                  }`}>
                    <div className="text-xl font-bold">
                      {formatNumber(achievement.requirement)} KM
                    </div>
                    <div className="text-sm">
                      {isUnlocked ? '✅ UNLOCKED' : `${formatNumber(totalDistance)}/${formatNumber(achievement.requirement)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-16 text-white cartoon-text">
            ROADMAP
          </h2>
          
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const isReached = totalDistance >= milestone.distance;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-8 rounded-2xl transform transition-all duration-500 hover:scale-105 shadow-xl ${
                    isReached ? 'bg-green-500' : 'bg-white'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black ${
                    isReached ? 'bg-white text-green-500' : 'bg-orange-400 text-white'
                  }`}>
                    {formatNumber(milestone.distance)}
                  </div>
                  
                  <div className="flex-1 text-center mx-8">
                    <h3 className={`text-3xl font-bold ${
                      isReached ? 'text-white' : 'text-gray-800'
                    }`}>
                      {formatNumber(milestone.distance)} KM
                    </h3>
                    <p className={`text-xl font-bold ${
                      isReached ? 'text-white' : 'text-blue-500'
                    }`}>
                      ${milestone.mcap}
                    </p>
                  </div>

                  <div className={`text-right ${
                    isReached ? 'text-white' : 'text-gray-600'
                  }`}>
                    <div className="text-lg font-bold">
                      {milestone.reward}
                    </div>
                    <div className="text-sm">
                      {isReached ? '🏆 EARNED' : '🔒 LOCKED'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white p-12 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-5xl font-black text-orange-400 mb-8 cartoon-text">
              BUY LIVERUN
            </h2>
            <div className="text-2xl font-bold text-gray-700 mb-6">
              Current Holdings: {formatNumber(liverunCoins)} LIVERUN
            </div>
            <button className="bg-blue-500 text-white px-16 py-6 rounded-full text-3xl font-black shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
              BUY MORE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
