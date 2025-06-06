import React from 'react';
import { Heart, Users, Award, Star, Truck, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              About <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">KiddyShop</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about bringing joy, creativity, and learning to children through carefully curated toys and educational products.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Happy children playing"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2020 by parents who understand the importance of quality play in child development, 
                KiddyShop has grown from a small family business to a trusted destination for parents worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that every child deserves access to toys that inspire creativity, promote learning, 
                and most importantly, bring smiles to their faces. That's why we carefully select each product 
                in our collection, ensuring it meets our high standards for safety, quality, and educational value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Safety First</h3>
              <p className="text-gray-600">
                Every product is rigorously tested to meet or exceed safety standards. Your child's wellbeing is our top priority.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Promise</h3>
              <p className="text-gray-600">
                We partner with trusted manufacturers who share our commitment to creating durable, high-quality products.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Family Focus</h3>
              <p className="text-gray-600">
                As parents ourselves, we understand what families need and strive to provide exceptional service and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-pink-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-pink-100">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-pink-100">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-pink-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose KiddyShop?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Truck className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fast & Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $25. Most orders arrive within 2-3 business days.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Safe & Secure</h3>
              <p className="text-gray-600">Your personal information is protected with industry-standard encryption.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Star className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Curation</h3>
              <p className="text-gray-600">Our team of child development experts carefully selects every product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind KiddyShop</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', bio: 'Mother of two with 10+ years in child development' },
              { name: 'Mike Chen', role: 'Product Manager', bio: 'Former toy designer with expertise in educational products' },
              { name: 'Emily Davis', role: 'Customer Success', bio: 'Dedicated to ensuring every family has a great experience' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-pink-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;