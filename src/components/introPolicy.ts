export type IntroContext = {
    enabled: boolean;
    reducedMotion: boolean;
    replay: boolean;
    seen: boolean;
    deepLink: boolean;
};
export function shouldPlayIntro({ enabled, reducedMotion, replay, seen, deepLink }: IntroContext) {
    return enabled && !reducedMotion && (replay || (!seen && !deepLink));
}
