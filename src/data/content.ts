/**
 * Site copy: focus areas, applications, approach and values.
 * Edit the text here; the pages pick it up automatically.
 */
import type { IconName } from '@/lib/icons';

export interface FocusArea {
  id: string;
  title: string;
  icon: IconName;
  text: string;
  points: string[];
}

/** The three disciplines Redoxtronics specialises in. */
export const focusAreas: FocusArea[] = [
  {
    id: 'electrochemical-workstations',
    title: 'Electrochemical workstations',
    icon: 'activity',
    text: 'Potentiostat-based instruments for electrochemical measurement, from the analog front end to the software that records the data.',
    points: ['Potentiostat electronics', 'Portable instrument design', 'Measurement software'],
  },
  {
    id: 'gas-sensors',
    title: 'Gas sensors',
    icon: 'wind',
    text: 'Gas sensing and detection, from interfacing the sensing element and conditioning its signal to complete detector units.',
    points: ['Sensor interfacing', 'Signal conditioning', 'Detector design'],
  },
  {
    id: 'embedded-systems',
    title: 'Embedded systems',
    icon: 'cpu',
    text: 'Custom electronics, PCB design and firmware for precise and reliable measurement devices.',
    points: ['Circuit & PCB design', 'Firmware development', 'Prototyping & testing'],
  },
];

export interface Application {
  icon: IconName;
  title: string;
  text: string;
}

/** Where electrochemical measurement and gas sensing are used. */
export const applications: Application[] = [
  {
    icon: 'graduation-cap',
    title: 'Research & academia',
    text: 'Electrochemistry research and teaching laboratories.',
  },
  {
    icon: 'flask-conical',
    title: 'Sensor development',
    text: 'Developing and testing electrodes, sensors and new materials.',
  },
  {
    icon: 'battery-charging',
    title: 'Energy & materials',
    text: 'Battery, corrosion and materials studies.',
  },
  {
    icon: 'leaf',
    title: 'Environmental monitoring',
    text: 'Measuring gases and pollutants in air and water.',
  },
  {
    icon: 'shield-check',
    title: 'Industrial safety',
    text: 'Detecting hazardous gases in the workplace.',
  },
  {
    icon: 'microscope',
    title: 'Analytical testing',
    text: 'Electrochemical analysis in quality-control and testing labs.',
  },
];

export interface Step {
  title: string;
  icon: IconName;
  text: string;
}

/** How Redoxtronics works, from idea to instrument. */
export const approach: Step[] = [
  {
    title: 'Research',
    icon: 'microscope',
    text: 'We start from the electrochemistry and the sensing problem: what needs to be measured, and how precisely.',
  },
  {
    title: 'Design',
    icon: 'circuit-board',
    text: 'Electronics, firmware and software are designed together, so every part of the measurement chain fits.',
  },
  {
    title: 'Prototype & test',
    icon: 'test-tube-diagonal',
    text: 'We build real hardware and test it with real measurements, refining it until the results are right.',
  },
  {
    title: 'Deliver',
    icon: 'package',
    text: 'Instruments and software that are ready for researchers, educators and industry.',
  },
];

export interface Value {
  icon: IconName;
  title: string;
  text: string;
}

/** Why work with Redoxtronics (About page). */
export const values: Value[] = [
  {
    icon: 'layers',
    title: 'End-to-end R&D',
    text: 'Sensors, electronics, firmware and software are developed in-house, so the whole measurement chain is designed to work together.',
  },
  {
    icon: 'atom',
    title: 'Science first',
    text: 'Our instruments are built around how real electrochemical and gas-sensing measurements behave, not just around a component list.',
  },
  {
    icon: 'map-pin',
    title: 'Developed in India',
    text: 'Designed and developed in Tiruchirappalli, Tamil Nadu, with support directly from the team that built it.',
  },
];
