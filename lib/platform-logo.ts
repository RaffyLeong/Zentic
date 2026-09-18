export function getPlatformLogo(platform: string): string {
  const logos: Record<string, string> = {
    Rightmove: 'https://www.rightmove.co.uk/favicon.ico',
    Zoopla: 'https://www.zoopla.co.uk/favicon.ico',
    OnTheMarket: 'OnTheMarket.png',
  };
  return logos[platform] || '';
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    Rightmove: '#00DE87',   // Rightmove green
    Zoopla: '#8046F1',      // Zoopla purple
    OnTheMarket: '#0A5CD8', // OTM blue
  };
  return colors[platform] || '#6B7280';
}