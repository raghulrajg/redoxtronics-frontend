// Curated subset of Lucide icons (https://lucide.dev, ISC licence).
// To add an icon: import it below and add it to the map.
import icActivity from 'lucide-static/icons/activity.svg?raw';
import icArrowRight from 'lucide-static/icons/arrow-right.svg?raw';
import icArrowUpRight from 'lucide-static/icons/arrow-up-right.svg?raw';
import icAtom from 'lucide-static/icons/atom.svg?raw';
import icBatteryCharging from 'lucide-static/icons/battery-charging.svg?raw';
import icBeaker from 'lucide-static/icons/beaker.svg?raw';
import icBell from 'lucide-static/icons/bell.svg?raw';
import icBuilding2 from 'lucide-static/icons/building-2.svg?raw';
import icCheck from 'lucide-static/icons/check.svg?raw';
import icChevronDown from 'lucide-static/icons/chevron-down.svg?raw';
import icCircuitBoard from 'lucide-static/icons/circuit-board.svg?raw';
import icClock from 'lucide-static/icons/clock.svg?raw';
import icCpu from 'lucide-static/icons/cpu.svg?raw';
import icDownload from 'lucide-static/icons/download.svg?raw';
import icExternalLink from 'lucide-static/icons/external-link.svg?raw';
import icFileText from 'lucide-static/icons/file-text.svg?raw';
import icFlaskConical from 'lucide-static/icons/flask-conical.svg?raw';
import icGauge from 'lucide-static/icons/gauge.svg?raw';
import icGraduationCap from 'lucide-static/icons/graduation-cap.svg?raw';
import icHourglass from 'lucide-static/icons/hourglass.svg?raw';
import icLayers from 'lucide-static/icons/layers.svg?raw';
import icLeaf from 'lucide-static/icons/leaf.svg?raw';
import icMail from 'lucide-static/icons/mail.svg?raw';
import icMapPin from 'lucide-static/icons/map-pin.svg?raw';
import icMicrochip from 'lucide-static/icons/microchip.svg?raw';
import icMicroscope from 'lucide-static/icons/microscope.svg?raw';
import icMonitor from 'lucide-static/icons/monitor.svg?raw';
import icMonitorDown from 'lucide-static/icons/monitor-down.svg?raw';
import icPackage from 'lucide-static/icons/package.svg?raw';
import icPhone from 'lucide-static/icons/phone.svg?raw';
import icPlus from 'lucide-static/icons/plus.svg?raw';
import icRadar from 'lucide-static/icons/radar.svg?raw';
import icSend from 'lucide-static/icons/send.svg?raw';
import icShieldCheck from 'lucide-static/icons/shield-check.svg?raw';
import icSparkles from 'lucide-static/icons/sparkles.svg?raw';
import icTestTubeDiagonal from 'lucide-static/icons/test-tube-diagonal.svg?raw';
import icWaves from 'lucide-static/icons/waves.svg?raw';
import icWind from 'lucide-static/icons/wind.svg?raw';
import icWrench from 'lucide-static/icons/wrench.svg?raw';
import icZap from 'lucide-static/icons/zap.svg?raw';

export const icons = {
  'activity': icActivity,
  'arrow-right': icArrowRight,
  'arrow-up-right': icArrowUpRight,
  'atom': icAtom,
  'battery-charging': icBatteryCharging,
  'beaker': icBeaker,
  'bell': icBell,
  'building-2': icBuilding2,
  'check': icCheck,
  'chevron-down': icChevronDown,
  'circuit-board': icCircuitBoard,
  'clock': icClock,
  'cpu': icCpu,
  'download': icDownload,
  'external-link': icExternalLink,
  'file-text': icFileText,
  'flask-conical': icFlaskConical,
  'gauge': icGauge,
  'graduation-cap': icGraduationCap,
  'hourglass': icHourglass,
  'layers': icLayers,
  'leaf': icLeaf,
  'mail': icMail,
  'map-pin': icMapPin,
  'microchip': icMicrochip,
  'microscope': icMicroscope,
  'monitor': icMonitor,
  'monitor-down': icMonitorDown,
  'package': icPackage,
  'phone': icPhone,
  'plus': icPlus,
  'radar': icRadar,
  'send': icSend,
  'shield-check': icShieldCheck,
  'sparkles': icSparkles,
  'test-tube-diagonal': icTestTubeDiagonal,
  'waves': icWaves,
  'wind': icWind,
  'wrench': icWrench,
  'zap': icZap,
} as const;

export type IconName = keyof typeof icons;
