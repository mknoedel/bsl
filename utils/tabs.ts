import { ITab } from '../interfaces/index'
import emotionForm from './tabs/emotion'
import trustForm from './tabs/trust'
import timeManagementForm from './tabs/time-management'
import successForm from './tabs/success'
import socialForm from './tabs/social'
import selfForm from './tabs/self'
import schoolForm from './tabs/school'
import nutritionForm from './tabs/nutrition'
import moodForm from './tabs/mood'
import mentalForm from './tabs/mental'
import loveForm from './tabs/love'
import lifestyleForm from './tabs/lifestyle'
import honestyForm from './tabs/honesty'
import funForm from './tabs/fun'
import friendsForm from './tabs/friends'
import fitnessForm from './tabs/fitness'
import fearForm from './tabs/fear'
import familyForm from './tabs/family'
import responsibilityForm from './tabs/responsibility'
import workJobForm from './tabs/work-job'

const tabs: ITab[] = [
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

export default tabs