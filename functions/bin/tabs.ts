import emotionForm from './tabsV1/emotion'
import trustForm from './tabsV1/trust'
import timeManagementForm from './tabsV1/time-management'
import successForm from './tabsV1/success'
import socialForm from './tabsV1/social'
import selfForm from './tabsV1/self'
import schoolForm from './tabsV1/school'
import nutritionForm from './tabsV1/nutrition'
import moodForm from './tabsV1/mood'
import mentalForm from './tabsV1/mental'
import loveForm from './tabsV1/love'
import lifestyleForm from './tabsV1/lifestyle'
import honestyForm from './tabsV1/honesty'
import funForm from './tabsV1/fun'
import friendsForm from './tabsV1/friends'
import fitnessForm from './tabsV1/fitness'
import fearForm from './tabsV1/fear'
import familyForm from './tabsV1/family'
import responsibilityForm from './tabsV1/responsibility'
import workJobForm from './tabsV1/work-job'

import emotion1AForm from './tabsV2/emotion1A'
import emotion1BForm from './tabsV2/emotion1B'
import emotion1CForm from './tabsV2/emotion1C'
import physical1AForm from './tabsV2/physical1A'
import physical1BForm from './tabsV2/physical1B'
import physical1CForm from './tabsV2/physical1C'
import social1AForm from './tabsV2/social1A'
import social1BForm from './tabsV2/social1B'
import social1CForm from './tabsV2/social1C'
import intellect1AForm from './tabsV2/intellect1A'
import intellect1BForm from './tabsV2/intellect1B'
import intellect1CForm from './tabsV2/intellect1C'

const tabsV1: any[] = [
  {"name": "Emotion",         "questions": emotionForm},
  {"name": "Family",          "questions": familyForm},
  {"name": "Fear",            "questions": fearForm},
  {"name": "Fitness",         "questions": fitnessForm},
  {"name": "Friends",         "questions": friendsForm},
  {"name": "Fun",             "questions": funForm},
  {"name": "Honesty",         "questions": honestyForm},
  {"name": "Lifestyle",       "questions": lifestyleForm},
  {"name": "Love",            "questions": loveForm},
  {"name": "Mental",          "questions": mentalForm},
  {"name": "Mood",            "questions": moodForm},
  {"name": "Nutrition",       "questions": nutritionForm},
  {"name": "Responsibility",  "questions": responsibilityForm},
  {"name": "School",          "questions": schoolForm},
  {"name": "Self",            "questions": selfForm},
  {"name": "Social",          "questions": socialForm},
  {"name": "Success",         "questions": successForm},
  {"name": "Trust",           "questions": trustForm},
  {"name": "Time Management", "questions": timeManagementForm},
  {"name": "Work Job",        "questions": workJobForm},
]

const tabsV2 = [
  {"name": "Emotional: Basic Understanding", "questions": emotion1AForm},
  {"name": "Emotional: Mood",                "questions": emotion1BForm},
  {"name": "Emotional: Love and Self",       "questions": emotion1CForm},
  {"name": "Physical: General",              "questions": physical1AForm},
  {"name": "Physical: Injuries",             "questions": physical1BForm},
  {"name": "Physical: Nutrition",            "questions": physical1CForm},
  {"name": "Social: General",                "questions": social1AForm},
  {"name": "Social: Family & Friends",       "questions": social1BForm},
  {"name": "Social: Lifestyle and Fun",      "questions": social1CForm},
  {"name": "Intellectual: General",          "questions": intellect1AForm},
  {"name": "Intellectual: Enjoyment",        "questions": intellect1BForm},
  {"name": "Intellectual: Mental Success",   "questions": intellect1CForm},
]

export default tabsV2