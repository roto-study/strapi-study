import React, { useState, useEffect } from "react"
import {
  ChakraProvider,
  Box,
  theme,
  SimpleGrid,
  Spinner,
  AspectRatio,
  Image,
  Flex,
  Tag,
} from "@chakra-ui/react"
import { Course } from "./models"

const END_POINT = 'http://localhost:1337'

const CourseTypeText = {
  LIVE: '라이브',
  LESSON: '강의',
  STUDY: '스터디',
  BOOK: '도서실습'
}
export const App = () => {
  const [isLoading, setLoading] = useState(false)
  const [courses, setCourses] = useState<Course[] | null>(null)
 
  useEffect(() => {
    const fetchCourses = async() => {
      try {
        setLoading(true)
        const res = await fetch(`${END_POINT}/api/courses?populate=*`)
        const result = await res.json()
 
        setCourses(result.data)
      } catch(e) {
        alert('뭔가 잘못되었습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" padding="24px">
        {isLoading && <Spinner />}
        <SimpleGrid columns={3} spacing={10}>
        {courses && courses.map(course => (
          <Box key={course.id} borderRadius="16px" border="1px solid #ccc">
            <AspectRatio ratio={16 / 9}>
              <Image src={course.imageUrl} w="100%" borderTopLeftRadius="16px" borderTopRightRadius="16px" />
            </AspectRatio>
            <Box padding="24px" fontSize="xs" textAlign="left" fontWeight="bold" > 
              <Box display="inline">{course.courseType ? CourseTypeText[course.courseType] : ''}{course.nth ? `/${course.nth}기`:''}</Box>
              <Box display="inline" marginLeft="4px">{course.title}</Box>
            </Box>
            <Flex justifyContent="space-between" padding="24px">
              <Box textAlign="right" >
                {course.price}원
              </Box>
              <Flex gap="4px">
              {course.tags.map(tag => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
              </Flex>
            </Flex>
            
          </Box>
        ))}  
        </SimpleGrid>
        
      </Box>
    </ChakraProvider>
  )
}
