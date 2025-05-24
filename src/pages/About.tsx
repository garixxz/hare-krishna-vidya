
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Former corporate executive who dedicated her life to social work after witnessing rural poverty firsthand.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Operations Head',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Logistics expert ensuring efficient distribution of kits to the most remote areas.'
    },
    {
      name: 'Meera Patel',
      role: 'Community Outreach',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Builds relationships with local communities and ensures culturally sensitive implementations.'
    }
  ];

  const milestones = [
    { year: '2019', event: 'Founded HopeKits with first 100 education kits' },
    { year: '2020', event: 'Distributed 1,000+ grocery kits during pandemic' },
    { year: '2021', event: 'Established 10 community learning centers' },
    { year: '2022', event: 'Reached 50+ villages across 5 states' },
    { year: '2023', event: 'Partnered with 25+ local NGOs' },
    { year: '2024', event: '15,000+ lives impacted through our programs' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-orange-600">HopeKits</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe that small acts of kindness can create massive waves of change. 
            Since 2019, we've been curating essential kits that address the fundamental 
            needs of underprivileged communities across India.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 border-l-4 border-orange-600">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To bridge the gap between abundance and scarcity by creating 
                  sustainable support systems that empower communities through 
                  education, nutrition, and infrastructure development.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-l-4 border-blue-600">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  A world where every child has access to quality education, 
                  every family has nutritious food, and every community has 
                  the infrastructure needed to thrive and prosper.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Rural school children"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  It all started when our founder, Priya Sharma, visited a remote 
                  village in Rajasthan and saw children walking 5 kilometers to 
                  school with torn notebooks and broken pencils. That moment 
                  sparked the idea of "kits" - carefully curated packages that 
                  address specific needs.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  What began as 100 education kits has now grown into a movement 
                  that has touched over 15,000 lives. We've learned that sustainable 
                  change comes not from charity, but from creating systems that 
                  empower communities to thrive.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, HopeKits operates across 5 states, working with local 
                  partners to ensure that our support reaches those who need it most, 
                  in ways that respect their dignity and cultural values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-600 flex-1">
                  <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Heart, title: 'Compassion', desc: 'We lead with empathy and understanding' },
              { icon: Users, title: 'Community', desc: 'We work with, not for, local communities' },
              { icon: Award, title: 'Excellence', desc: 'We strive for the highest quality in everything' },
              { icon: Target, title: 'Impact', desc: 'We measure success by lives transformed' }
            ].map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <value.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every kit you donate creates a ripple effect of positive change. 
            Be part of a movement that's transforming lives across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
            >
              Donate a Kit
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
            >
              Become a Volunteer
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
