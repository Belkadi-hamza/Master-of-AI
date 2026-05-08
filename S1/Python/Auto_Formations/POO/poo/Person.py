from abc import abstractmethod
from datetime import date
class Person:
    nbr_of_persons = 0
    # Constructor
    def __init__(self, name, yearOfBirth, gender = 'Not Specified'):
        self.__name = name
        self.__yearOfBirth = yearOfBirth
        self.__gender = gender
        self.__age = self.yearToAge(yearOfBirth)
        Person.nbr_of_persons += 1
    # dunder method
    def __add__(self, other):
        names = self.__name + " and " + other.__name
        return Person(names, self.__yearOfBirth, self.__gender)
    def __lt__(self, other):
        return self.__age < other.__age
    # Getters
    def getName(self):
        return self.__name
    def getAge(self):
        return self.yearToAge(self.__yearOfBirth)
    def getYearOfBirth(self):
        return self.__yearOfBirth
    def getGender(self):
        return self.__gender
    # Setters
    def setName(self,newName):
        self.__name = newName
    def setYearOfBirth(self,newYearOfBirth):
        self.__yearOfBirth = newYearOfBirth
        self.__age = self.yearToAge(newYearOfBirth)
    def setGender(self,newGender):
        self.__gender = newGender

    # Class Methods
    @classmethod
    def yearToAge(cls, yearOfBirth):
        return date.today().year - yearOfBirth
    @classmethod
    def isAdult(cls, yearOfBirth):
        return cls.yearToAge(yearOfBirth) >= 18
    @classmethod
    def ageToYear(cls, age):
        return date.today().year - age
    # Alternative Constructor
    @classmethod
    def initFromAge(cls, name, age, gender = 'Not Specified'):
        yearOfBirth = cls.ageToYear(age)
        return cls(name, yearOfBirth, gender)
    # Abstract Method
    @abstractmethod
    def info(cls):
        pass

    # dunder method
    def __str__(self):
        return f"Hello, my name is {self.__name} and I am {self.__age} years old , my gender is {self.__gender}."
    def __call__(self):
        return f"{self.__name} ({self.__age} years old)"
    def __repr__(self):
        return f"Person('{self.__name}', {self.__yearOfBirth}, '{self.__gender}')"
    def __bool__(self):
        return self.__age >= 18
    def __len__(self):
        return self.__age
    def __add__(self, other):
        names = self.__name + " and " + other.__name
        return Person(names, self.__yearOfBirth, self.__gender)
    def __iadd__(self, years):
        self.__yearOfBirth -= years
        self.__age = self.yearToAge(self.__yearOfBirth)
        return self
    def __radd__(self, years):
        new_yearOfBirth = self.__yearOfBirth - years
        return Person(self.__name, new_yearOfBirth, self.__gender)
    def __getitem__(self, index):
        if index == 0:
            return self.__name
        elif index == 1:
            return self.__yearOfBirth
        elif index == 2:
            return self.__gender
        elif index == 3:    
            return self.__age
        else:
            raise IndexError("Index out of range")
    def __setitem__(self, index, value):
        if index == 0:
            self.__name = value
        elif index == 1:
            self.setYearOfBirth(value)
        elif index == 2:
            self.__gender = value
        else:
            raise IndexError("Index out of range")